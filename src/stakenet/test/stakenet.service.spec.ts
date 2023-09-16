import { Test, TestingModule } from '@nestjs/testing';
import { StakenetService } from '../stakenet.service';
import { Web3Service } from '../../web3/web3.service';

const web3ServiceMock = {};

describe('StakenetService', () => {
  let service: StakenetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StakenetService,
        {
          provide: Web3Service,
          useValue: web3ServiceMock,
        },
      ],
    }).compile();

    service = module.get<StakenetService>(StakenetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
