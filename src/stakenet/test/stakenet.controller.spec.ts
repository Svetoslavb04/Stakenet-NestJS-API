import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { StakenetController } from '../stakenet.controller';
import { StakenetService } from '../stakenet.service';
import { StakenetPropertyEnum } from '../enum/stakenet-property.enum';

describe('StakenetController', () => {
  let controller: StakenetController;

  const ethValidAddress = '0xValidEthAddress';
  const ethInvalidAddress = '0xInvalidEthAddress';

  const propertyData = 'property data';
  const propertyDataWithUser = 'property data with user';
  const userData = 'userData';
  const propertyDataWithOwnerAndSpender =
    'property data with owner and spender';

  const mockStakenetService = {
    getPropertyData: jest.fn((address: string, property: string) => {
      if (address === ethValidAddress) {
        return propertyData;
      } else {
        throw new Error();
      }
    }),
    getPropertyWithUserRequired: jest.fn(
      (address: string, property: string, user: string) => {
        if (address === ethValidAddress && user === ethValidAddress) {
          return propertyDataWithUser;
        } else {
          throw new Error();
        }
      },
    ),
    getPropertyWithOwnerAndSpender: jest.fn(
      (address: string, property: string, owner: string, spender: string) => {
        if (
          address !== ethInvalidAddress &&
          owner !== ethInvalidAddress &&
          spender !== ethInvalidAddress
        ) {
          return propertyDataWithOwnerAndSpender;
        } else {
          throw new Error();
        }
      },
    ),
    getUserData: jest.fn((address: string, user: string) => {
      if (address != ethInvalidAddress) {
        return userData;
      } else {
        throw new Error();
      }
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StakenetController],
      providers: [StakenetService],
    })
      .overrideProvider(StakenetService)
      .useValue(mockStakenetService)
      .compile();

    controller = module.get<StakenetController>(StakenetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return correct contract property', async () => {
    const params = { address: ethValidAddress };
    const query = {
      property: StakenetPropertyEnum.erc20,
      user: undefined,
      owner: undefined,
      spender: undefined,
    };

    const result = await controller.index(params, query);

    expect(result).toEqual(propertyData);
  });

  it('should return correct contract property with user', async () => {
    const params = { address: ethValidAddress };
    const query = {
      property: StakenetPropertyEnum.balanceOf,
      user: ethValidAddress,
      owner: undefined,
      spender: undefined,
    };

    const result = await controller.index(params, query);

    expect(result).toEqual(propertyDataWithUser);
  });

  it('should return correct userData', async () => {
    const params = { address: ethValidAddress };
    const query = {
      property: StakenetPropertyEnum.userData,
      user: ethValidAddress,
      owner: undefined,
      spender: undefined,
    };

    const result = await controller.index(params, query);

    expect(result).toEqual(userData);
  });

  it('should return correct contract property with user', async () => {
    const params = { address: ethValidAddress };
    const query = {
      property: StakenetPropertyEnum.allowance,
      user: undefined,
      owner: ethValidAddress,
      spender: ethValidAddress,
    };

    const result = await controller.index(params, query);

    expect(result).toEqual(propertyDataWithOwnerAndSpender);
  });

  it('should catch error and return bad request', async () => {
    const params = { address: ethValidAddress };
    const query = {
      property: StakenetPropertyEnum.allowance,
      user: undefined,
      owner: ethInvalidAddress,
      spender: ethValidAddress,
    };

    try {
      await controller.index(params, query);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });
});
