import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';

import { TokenController } from '../token.controller';
import { TokenService } from '../token.service';

import { EthereumAddressDTO } from '../../dto/ethereumAdress.dto';

describe('TokenController', () => {
  let tokenController: TokenController;

  const mockTokenInfo = { name: 'LimeSpark', symbol: 'LSK', decimals: '18' };

  const ERC20TokenAddress = '0x2BdFb6a7B89e933B0A8c34E3dcc32E8C684c7738';
  const NonERC20TokenAddress = '0x50285D2b0D6C0e3059948Ab4108Eb9365d5Af6C8';

  beforeEach(async () => {
    const mockTokenService = {
      getTokenBaseInformation: jest.fn(async (address: string) => {
        switch (address) {
          case ERC20TokenAddress:
            return mockTokenInfo;
          case NonERC20TokenAddress:
            throw Error();
        }
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TokenController],
      providers: [TokenService],
    })
      .overrideProvider(TokenService)
      .useValue(mockTokenService)
      .compile();

    tokenController = module.get<TokenController>(TokenController);
  });

  it('should be defined', () => {
    expect(tokenController).toBeDefined();
  });

  describe('index', () => {
    it('should return token information', async () => {
      const result = await tokenController.index({
        address: ERC20TokenAddress,
      });

      expect(result).toEqual(mockTokenInfo);
    });

    it('should handle an error and throw BadRequestException on a non ERC20 address', async () => {
      try {
        await tokenController.index({ address: NonERC20TokenAddress });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Ethereum address is not an ERC20 token');
      }
    });
  });
});
