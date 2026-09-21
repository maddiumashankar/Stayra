import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuthService } from '../auth.service';
import { PrismaService } from '../../../database/prisma.service';

describe('AuthService & Security Pentest Suite', () => {
  let authService: AuthService;
  let prismaService: jest.Mocked<any>;
  let jwtService: jest.Mocked<any>;

  beforeEach(async () => {
    prismaService = {
      user: {
        findFirst: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
      },
      residentProfile: {
        create: jest.fn(),
      },
      ownerProfile: {
        create: jest.fn(),
      },
      $transaction: jest.fn(async (cb) => cb(prismaService)),
    };

    jwtService = {
      sign: jest.fn().mockReturnValue('mock-signed-jwt-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prismaService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('signup()', () => {
    const validResidentDto = {
      fullName: 'Karan Patel',
      email: 'karan.patel@example.com',
      phoneNumber: '+919876543230',
      password: 'StrongPassword123!',
      role: 'RESIDENT' as const,
    };

    it('should successfully register a resident with formatted StayraResidentId', async () => {
      prismaService.user.findFirst.mockResolvedValue(null);
      prismaService.user.create.mockResolvedValue({
        id: 'user-karan-123',
        fullName: validResidentDto.fullName,
        email: validResidentDto.email,
        phoneNumber: validResidentDto.phoneNumber,
        passwordHash: 'hashed_password_val',
        role: 'RESIDENT',
        isActive: true,
      });

      const result = await authService.signup(validResidentDto);

      expect(result.user).toHaveProperty('id', 'user-karan-123');
      expect(result.user).toHaveProperty('stayraResidentId');
      expect(result.user.stayraResidentId).toMatch(/^STR-RES-\d{6}-\d{4}$/);
      expect(result.tokens).toHaveProperty('accessToken', 'mock-signed-jwt-token');

      // Security Pentest Check: Zero Password Leakage
      expect((result.user as any).passwordHash).toBeUndefined();
    });

    it('should successfully register a PG owner with initial owner profile', async () => {
      const ownerDto = {
        fullName: 'Anita Sharma',
        email: 'anita.sharma@stayra.com',
        phoneNumber: '+919876543231',
        password: 'OwnerPassword123!',
        role: 'OWNER' as const,
      };

      prismaService.user.findFirst.mockResolvedValue(null);
      prismaService.user.create.mockResolvedValue({
        id: 'owner-anita-123',
        fullName: ownerDto.fullName,
        email: ownerDto.email,
        phoneNumber: ownerDto.phoneNumber,
        passwordHash: 'hashed_password_val',
        role: 'OWNER',
        isActive: true,
      });

      const result = await authService.signup(ownerDto);

      expect(result.user.role).toBe('OWNER');
      expect(prismaService.ownerProfile.create).toHaveBeenCalledWith({
        data: {
          userId: 'owner-anita-123',
          payoutAccountVerified: false,
        },
      });
    });

    it('🛡️ should reject duplicate email with 409 Conflict', async () => {
      prismaService.user.findFirst.mockResolvedValue({
        id: 'existing-id',
        email: validResidentDto.email,
        phoneNumber: '+919999999999',
      });

      await expect(authService.signup(validResidentDto)).rejects.toThrow(ConflictException);
    });

    it('🛡️ should reject duplicate phone number with 409 Conflict', async () => {
      prismaService.user.findFirst.mockResolvedValue({
        id: 'existing-id',
        email: 'other@example.com',
        phoneNumber: validResidentDto.phoneNumber,
      });

      await expect(authService.signup(validResidentDto)).rejects.toThrow(ConflictException);
    });

    it('🛡️ should reject passwords under 8 characters with 400 Bad Request', async () => {
      await expect(
        authService.signup({
          ...validResidentDto,
          password: 'short',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('🛡️ should reject invalid email format with 400 Bad Request', async () => {
      await expect(
        authService.signup({
          ...validResidentDto,
          email: 'invalid-email-format',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('🛡️ should reject short full name with 400 Bad Request', async () => {
      await expect(
        authService.signup({
          ...validResidentDto,
          fullName: 'A',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('🛡️ should reject invalid phone number with 400 Bad Request', async () => {
      await expect(
        authService.signup({
          ...validResidentDto,
          phoneNumber: '123',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('🛡️ should block privilege escalation attempts (e.g. role: ADMIN or STAFF)', async () => {
      await expect(
        authService.signup({
          ...validResidentDto,
          role: 'ADMIN' as any,
        }),
      ).rejects.toThrow(BadRequestException);

      await expect(
        authService.signup({
          ...validResidentDto,
          role: 'STAFF' as any,
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('login()', () => {
    const rawPassword = 'StayraPass123!';
    const hashedPassword = bcrypt.hashSync(rawPassword, 10);

    it('should successfully authenticate user with correct credentials', async () => {
      prismaService.user.findUnique.mockResolvedValue({
        id: 'rohan-user-id',
        fullName: 'Rohan Verma',
        email: 'rohan.verma@example.com',
        phoneNumber: '+919876543220',
        passwordHash: hashedPassword,
        role: 'RESIDENT',
        isActive: true,
        residentProfile: { stayraResidentId: 'STR-RES-202609-0842' },
      });

      const result = await authService.login({
        email: 'rohan.verma@example.com',
        password: rawPassword,
      });

      expect(result.user).toHaveProperty('fullName', 'Rohan Verma');
      expect(result.tokens).toHaveProperty('accessToken', 'mock-signed-jwt-token');
      expect((result.user as any).passwordHash).toBeUndefined();
    });

    it('🛡️ should reject inactive accounts with 401 Unauthorized', async () => {
      prismaService.user.findUnique.mockResolvedValue({
        id: 'rohan-inactive-id',
        email: 'rohan.verma@example.com',
        passwordHash: hashedPassword,
        role: 'RESIDENT',
        isActive: false, // Inactive / banned account
      });

      await expect(
        authService.login({
          email: 'rohan.verma@example.com',
          password: rawPassword,
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('🛡️ should return generic 401 Unauthorized for incorrect password (prevent enumeration)', async () => {
      prismaService.user.findUnique.mockResolvedValue({
        id: 'rohan-user-id',
        email: 'rohan.verma@example.com',
        passwordHash: hashedPassword,
        isActive: true,
      });

      await expect(
        authService.login({
          email: 'rohan.verma@example.com',
          password: 'WrongPassword!',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('🛡️ should return generic 401 Unauthorized for non-existent email (prevent enumeration)', async () => {
      prismaService.user.findUnique.mockResolvedValue(null);

      await expect(
        authService.login({
          email: 'nonexistent@example.com',
          password: 'AnyPassword!',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('validateUserById()', () => {
    it('should return sanitized user when active user is found', async () => {
      prismaService.user.findUnique.mockResolvedValue({
        id: 'user-123',
        fullName: 'Rohan Verma',
        email: 'rohan.verma@example.com',
        phoneNumber: '+919876543220',
        role: 'RESIDENT',
        isActive: true,
        residentProfile: { stayraResidentId: 'STR-RES-202609-0842' },
      });

      const user = await authService.validateUserById('user-123');
      expect(user).toHaveProperty('id', 'user-123');
      expect(user).toHaveProperty('stayraResidentId', 'STR-RES-202609-0842');
    });

    it('should return null when user is inactive or not found', async () => {
      prismaService.user.findUnique.mockResolvedValue(null);
      const user = await authService.validateUserById('missing-id');
      expect(user).toBeNull();
    });

    it('should return null when user exists but isActive is false', async () => {
      prismaService.user.findUnique.mockResolvedValue({
        id: 'banned-user',
        isActive: false,
      });
      const user = await authService.validateUserById('banned-user');
      expect(user).toBeNull();
    });
  });
});

