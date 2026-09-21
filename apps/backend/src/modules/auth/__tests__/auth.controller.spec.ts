import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<Partial<AuthService>>;

  const mockAuthResponse = {
    user: {
      id: 'usr-123',
      fullName: 'Rohan Verma',
      email: 'rohan.verma@example.com',
      phoneNumber: '+919876543220',
      role: 'RESIDENT' as const,
      stayraResidentId: 'STR-RES-202609-0842',
    },
    tokens: {
      accessToken: 'mock-access-token',
      expiresIn: 604800,
    },
  };

  beforeEach(async () => {
    authService = {
      signup: jest.fn().mockResolvedValue(mockAuthResponse),
      login: jest.fn().mockResolvedValue(mockAuthResponse),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signup', () => {
    it('should forward signup dto to authService.signup', async () => {
      const dto = {
        fullName: 'Rohan Verma',
        email: 'rohan.verma@example.com',
        phoneNumber: '+919876543220',
        password: 'StayraPass123!',
        role: 'RESIDENT' as const,
      };

      const result = await controller.signup(dto);
      expect(authService.signup).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockAuthResponse);
    });
  });

  describe('login & signin', () => {
    const loginDto = {
      email: 'rohan.verma@example.com',
      password: 'StayraPass123!',
    };

    it('login() should forward login dto to authService.login', async () => {
      const result = await controller.login(loginDto);
      expect(authService.login).toHaveBeenCalledWith(loginDto);
      expect(result).toEqual(mockAuthResponse);
    });

    it('signin() should be an alias forwarding to authService.login', async () => {
      const result = await controller.signin(loginDto);
      expect(authService.login).toHaveBeenCalledWith(loginDto);
      expect(result).toEqual(mockAuthResponse);
    });
  });

  describe('getProfile (me)', () => {
    it('should return user from request', async () => {
      const mockUser = {
        id: 'usr-123',
        fullName: 'Rohan Verma',
        role: 'RESIDENT',
      };

      const result = await controller.getProfile(mockUser);
      expect(result).toEqual(mockUser);
    });
  });
});
