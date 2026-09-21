import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { JwtStrategy, JwtPayload } from '../strategies/jwt.strategy';
import { AuthService } from '../auth.service';

describe('JwtAuthGuard & JwtStrategy Security Suite', () => {
  describe('JwtAuthGuard', () => {
    let guard: JwtAuthGuard;

    beforeEach(() => {
      guard = new JwtAuthGuard();
    });

    it('should allow request and return user when authenticated', () => {
      const mockUser = {
        id: 'user-123',
        email: 'rohan.verma@example.com',
        role: 'RESIDENT',
      };

      const result = guard.handleRequest(null, mockUser);
      expect(result).toEqual(mockUser);
    });

    it('🛡️ should throw 401 Unauthorized when user is missing/falsy', () => {
      expect(() => guard.handleRequest(null, null)).toThrow(UnauthorizedException);
      expect(() => guard.handleRequest(null, false)).toThrow(UnauthorizedException);
    });

    it('🛡️ should propagate error when error is passed to handleRequest', () => {
      const customErr = new Error('JWT Expired');
      expect(() => guard.handleRequest(customErr, null)).toThrow(customErr);
    });
  });

  describe('JwtStrategy', () => {
    let strategy: JwtStrategy;
    let authService: jest.Mocked<Partial<AuthService>>;
    let configService: jest.Mocked<Partial<ConfigService>>;

    beforeEach(() => {
      configService = {
        get: jest.fn().mockReturnValue('test-secret-key-for-jwt-testing'),
      };

      authService = {
        validateUserById: jest.fn(),
      };

      strategy = new JwtStrategy(
        configService as ConfigService,
        authService as AuthService,
      );
    });

    it('should validate and return user for valid token payload', async () => {
      const payload: JwtPayload = {
        sub: 'user-abc-123',
        email: 'rohan.verma@example.com',
        role: 'RESIDENT',
      };

      (authService.validateUserById as jest.Mock).mockResolvedValue({
        id: 'user-abc-123',
        fullName: 'Rohan Verma',
        email: 'rohan.verma@example.com',
        phoneNumber: '+919876543220',
        role: 'RESIDENT',
        stayraResidentId: 'STR-RES-202609-0842',
      });

      const user = await strategy.validate(payload);
      expect(user).toBeDefined();
      expect(user.id).toBe('user-abc-123');
      expect(authService.validateUserById).toHaveBeenCalledWith('user-abc-123');
    });

    it('🛡️ should throw 401 Unauthorized if user is deleted or session invalidated', async () => {
      const payload: JwtPayload = {
        sub: 'revoked-user',
        email: 'revoked@example.com',
        role: 'RESIDENT',
      };

      (authService.validateUserById as jest.Mock).mockResolvedValue(null);

      await expect(strategy.validate(payload)).rejects.toThrow(UnauthorizedException);
    });
  });
});
