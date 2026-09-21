import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { SignUpRequestDTO, SignInRequestDTO } from '@stayra/shared-types';
import { PrismaService } from '../../database/prisma.service';

export type SignupDto = SignUpRequestDTO;
export type LoginDto = SignInRequestDTO;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { fullName, email, password, phoneNumber, role = 'RESIDENT' } = signupDto;

    // 1. Prevent privilege escalation via public signup
    if (role !== 'RESIDENT' && role !== 'OWNER') {
      throw new BadRequestException('Invalid registration role. Only RESIDENT and OWNER can self-register.');
    }

    // 2. Strict Input validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      throw new BadRequestException('Full name must be at least 2 characters long');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      throw new BadRequestException('A valid email address is required');
    }

    if (!phoneNumber || typeof phoneNumber !== 'string' || phoneNumber.trim().length < 10) {
      throw new BadRequestException('A valid phone number (at least 10 digits) is required');
    }

    if (!password || typeof password !== 'string' || password.length < 8) {
      throw new BadRequestException('Password must be at least 8 characters long');
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanPhone = phoneNumber.trim();

    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: cleanEmail },
          { phoneNumber: cleanPhone },
        ],
      },
    });

    if (existingUser) {
      if (existingUser.email === cleanEmail) {
        throw new ConflictException('Email is already registered');
      }
      throw new ConflictException('Phone number is already registered');
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const now = new Date();
    const yearMonth = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;
    const random4Digits = Math.floor(1000 + Math.random() * 9000);
    const stayraResidentId = `STR-RES-${yearMonth}-${random4Digits}`;

    const newUser = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          fullName: fullName.trim(),
          email: cleanEmail,
          phoneNumber: cleanPhone,
          passwordHash: hashedPassword,
          role,
          isActive: true,
        },
      });

      if (role === 'RESIDENT') {
        await tx.residentProfile.create({
          data: {
            userId: user.id,
            stayraResidentId,
            kycStatus: 'UNVERIFIED',
          },
        });
      } else if (role === 'OWNER') {
        await tx.ownerProfile.create({
          data: {
            userId: user.id,
            payoutAccountVerified: false,
          },
        });
      }

      return user;
    });

    const token = this.generateToken(newUser);

    return {
      user: {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        role: newUser.role,
        stayraResidentId: role === 'RESIDENT' ? stayraResidentId : null,
      },
      tokens: {
        accessToken: token,
        expiresIn: 604800, // 7 days in seconds
      },
    };
  }

  async login(loginDto: LoginDto) {
    if (!loginDto?.email || typeof loginDto.email !== 'string' || !loginDto?.password || typeof loginDto.password !== 'string') {
      throw new UnauthorizedException('Invalid email or password');
    }

    const cleanEmail = loginDto.email.toLowerCase().trim();

    // 1. Find user by email with linked profiles
    const user = await this.prisma.user.findUnique({
      where: { email: cleanEmail },
      include: {
        residentProfile: true,
        ownerProfile: true,
      },
    });

    // 2. Generic defense against account enumeration attacks (and inactive accounts)
    if (!user || !user.isActive || !user.passwordHash) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // 3. Verify bcrypt hash
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // 4. Generate signed JWT token
    const token = this.generateToken(user);

    // 5. Return sanitized user session
    return {
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        stayraResidentId: user.residentProfile?.stayraResidentId || null,
      },
      tokens: {
        accessToken: token,
        expiresIn: 604800,
      },
    };
  }

  async validateUserById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        residentProfile: true,
        ownerProfile: true,
      },
    });

    if (!user || !user.isActive) {
      return null;
    }

    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      stayraResidentId: user.residentProfile?.stayraResidentId || null,
    };
  }

  private generateToken(user: { id: string; email: string | null; role: string }) {
    return this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
  }
}