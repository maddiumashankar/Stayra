import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    healthController = app.get<HealthController>(HealthController);
  });

  describe('checkHealth', () => {
    it('should return health status ok with service name', () => {
      const result = healthController.checkHealth();
      expect(result).toHaveProperty('status', 'ok');
      expect(result).toHaveProperty('service', 'Stayra Modular Monolith Backend API');
      expect(result).toHaveProperty('version', '1.0.0');
      expect(typeof result.uptimeSeconds).toBe('number');
      expect(typeof result.timestamp).toBe('string');
    });
  });
});
