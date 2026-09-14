import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { PrismaService } from '../../database/prisma.service';

describe('HealthController', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const mockPrismaService = {
      $queryRaw: jest.fn().mockResolvedValue([{ 1: 1 }]),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    healthController = app.get<HealthController>(HealthController);
  });

  describe('checkHealth', () => {
    it('should return health status ok with service name and connected db', async () => {
      const result = await healthController.checkHealth();
      expect(result).toHaveProperty('status', 'ok');
      expect(result).toHaveProperty('service', 'Stayra Modular Monolith Backend API');
      expect(result).toHaveProperty('version', '1.0.0');
      expect(result).toHaveProperty('database', 'connected');
      expect(typeof result.uptimeSeconds).toBe('number');
      expect(typeof result.timestamp).toBe('string');
    });
  });
});
