import { Test, TestingModule } from '@nestjs/testing';
import { StakenetService } from '../stakenet.service';

describe('StakenetService', () => {
  let service: StakenetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StakenetService],
    }).compile();

    service = module.get<StakenetService>(StakenetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
