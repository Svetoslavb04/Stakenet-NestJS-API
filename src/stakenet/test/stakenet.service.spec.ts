import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StakenetService } from '../stakenet.service';
import { Web3Service } from '../../web3/web3.service';
import { Web3Module } from '../..//web3/web3.module';
import { StakenetPropertyEnum } from '../enum/stakenet-property.enum';

describe('StakenetService', () => {
  let service: StakenetService;

  const stakenetAddress = '0x6f0fBd20Ea72F6c50D9229d433b51CAd4590ec77';
  const stakenetLockDuration = 86000n;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true }), Web3Module],
      providers: [ConfigService, Web3Service, StakenetService],
    }).compile();

    service = module.get<StakenetService>(StakenetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create Stakenet contract', () => {
    const stakenet = service.createStakenetContract(stakenetAddress);

    expect(stakenet).toBeDefined();
  });

  it('should make a call to a property', async () => {
    const result: bigint = await service.getPropertyData(
      stakenetAddress,
      StakenetPropertyEnum.lockDurationInSeconds,
    );

    expect(result).toEqual(stakenetLockDuration);
  });

  it('should make a call to a property with user required', async () => {
    const result: bigint = await service.getPropertyWithUserRequired(
      stakenetAddress,
      StakenetPropertyEnum.userHasStaked,
      '0x9120250530053c5350B34Ebcd3f3824f33a0d167',
    );

    expect(result).toEqual(true);
  });

  it('should make a call to a property with owner and spender', async () => {
    const result: bigint = await service.getPropertyWithOwnerAndSpender(
      stakenetAddress,
      StakenetPropertyEnum.allowance,
      '0x9120250530053c5350B34Ebcd3f3824f33a0d167',
      '0x9120250530053c5350B34Ebcd3f3824f33a0d167',
    );

    expect(result).toEqual(0n);
  });
});
