import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from './token.service';
import { Web3Service } from '../web3/web3.service';
import { EthereumAddressDTO } from '../dto/ethereumAdress.dto';

const web3ServiceMock = {
  getContractAt: jest.fn(),
};

describe('TokenService', () => {
  let tokenService: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenService,
        {
          provide: Web3Service,
          useValue: web3ServiceMock,
        },
      ],
    }).compile();

    tokenService = module.get<TokenService>(TokenService);
  });

  it('should be defined', () => {
    expect(tokenService).toBeDefined();
  });

  describe('getTokenBaseInformation', () => {
    it('should get token information', async () => {
      const mockAddressObject: EthereumAddressDTO = {
        address: '0xERC20TokenAddress',
      };

      const mockTokenContract = {
        name: jest.fn().mockResolvedValue('TokenName'),
        symbol: jest.fn().mockResolvedValue('TokenSymbol'),
        decimals: jest.fn().mockResolvedValue(18),
      };

      web3ServiceMock.getContractAt.mockReturnValue(mockTokenContract);

      const result =
        await tokenService.getTokenBaseInformation(mockAddressObject);

      expect(result).toEqual({
        name: 'TokenName',
        symbol: 'TokenSymbol',
        decimals: '18',
      });

      expect(web3ServiceMock.getContractAt).toHaveBeenCalledWith(
        expect.any(Function),
        '0xERC20TokenAddress',
      );
    });
  });
});
