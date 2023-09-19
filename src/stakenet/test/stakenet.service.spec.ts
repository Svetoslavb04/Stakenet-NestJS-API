import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StakenetService } from '../stakenet.service';
import { Web3Service } from '../../web3/web3.service';
import { Web3Module } from '../..//web3/web3.module';
import { StakenetPropertyEnum } from '../enum/stakenet-property.enum';

const web3ServiceMock = {
  getContractAt: jest.fn(),
};

describe('StakenetService', () => {
  let service: StakenetService;

  const stakenetAddress = '0xB17DFd6C3e54138d151303164d048ea04965EDeb';

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

  it('should make a call to a property', async () => {
    const mockStakenetContract = {
      lockDurationInSeconds: jest.fn().mockResolvedValue(86400n),
    };

    web3ServiceMock.getContractAt.mockReturnValue(mockStakenetContract);

    const result = await service.getPropertyData(
      stakenetAddress,
      StakenetPropertyEnum.lockDurationInSeconds,
    );

    expect(result).toEqual(86400n);
  });

  it('should make a call to a property with user required', async () => {
    const mockStakenetContract = {
      userHasStaked: jest.fn().mockResolvedValue(true),
    };

    web3ServiceMock.getContractAt.mockReturnValue(mockStakenetContract);

    const result = await service.getPropertyWithUserRequired(
      stakenetAddress,
      StakenetPropertyEnum.userHasStaked,
      '0x0c9276b8bAf2b37140679204027d574AC2D71297',
    );

    expect(result).toEqual(true);
  });

  it('should make a call to a property with owner and spender', async () => {
    const mockStakenetContract = {
      allowance: jest.fn().mockResolvedValue(0n),
    };

    web3ServiceMock.getContractAt.mockReturnValue(mockStakenetContract);

    const result = await service.getPropertyWithOwnerAndSpender(
      stakenetAddress,
      StakenetPropertyEnum.allowance,
      '0x9120250530053c5350B34Ebcd3f3824f33a0d167',
      '0x9120250530053c5350B34Ebcd3f3824f33a0d167',
    );

    expect(result).toEqual(0n);
  });

  it('should throw error if contract does not have the function', () => {
    const mockStakenetContract = {
      _: jest.fn(),
    };

    web3ServiceMock.getContractAt.mockReturnValue(mockStakenetContract);

    expect(() =>
      service.getPropertyData(stakenetAddress, 'asdasd'),
    ).rejects.toThrow('The contract does not have such function');

    expect(() =>
      service.getPropertyWithUserRequired(
        stakenetAddress,
        'asdasd',
        '0x9120250530053c5350B34Ebcd3f3824f33a0d167',
      ),
    ).rejects.toThrow('The contract does not have such function');

    expect(() =>
      service.getPropertyWithOwnerAndSpender(
        stakenetAddress,
        'asdasd',
        '0x9120250530053c5350B34Ebcd3f3824f33a0d167',
        '0x9120250530053c5350B34Ebcd3f3824f33a0d167',
      ),
    ).rejects.toThrow('The contract does not have such function');
  });

  it('should return correct user data for a given user', async () => {
    const mockStakenetContract = {
      balanceOf: jest.fn().mockResolvedValue(10000000000000000000n),
      userHasStaked: jest.fn().mockResolvedValue(true),
      userStakedTimestamp: jest.fn().mockResolvedValue(1695122496n),
      lockDurationInSeconds: jest.fn().mockResolvedValue(86400n),
      yieldPercentage: jest.fn().mockResolvedValue(333333n),
      yieldDecimals: jest.fn().mockResolvedValue(4n),
    };

    web3ServiceMock.getContractAt.mockReturnValue(mockStakenetContract);

    const userData = await service.getUserData(
      stakenetAddress,
      '0x9120250530053c5350B34Ebcd3f3824f33a0d167',
    );

    expect(userData.balance).toEqual(10000000000000000000n);
    expect(userData.reward).toEqual(3333330000000000000n);
    expect(userData.lockDurationInSeconds).toEqual(86400n);
    expect(userData.userHasPosition).toEqual(true);
    expect(userData.userHasStaked).toEqual(true);
    expect(userData.userStakedTimestamp).toEqual(1695122496n);
  });
});
