import { Test, TestingModule } from '@nestjs/testing';
import { Web3Service } from '../web3.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InfuraProvider } from 'ethers';
import { ERC20, ERC20__factory } from '../../../types/ethers-contracts';

describe('Web3Service', () => {
  let web3Service: Web3Service;
  let configService: ConfigService;

  const erc20address = '0xf307D3B630945BF9678B31f731E827912be36DEC'; //A real ERC20 Token address

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      providers: [Web3Service],
    }).compile();

    web3Service = module.get<Web3Service>(Web3Service);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(web3Service).toBeDefined();
  });

  describe('getInfuraProvider', () => {
    it('should create an InfuraProvider', async () => {
      const network = 'sepolia';

      const provider = web3Service.getInfuraProvider(network);

      const providerNetwork = await provider.getNetwork();

      expect(provider).toBeInstanceOf(InfuraProvider);
      expect(providerNetwork.name).toBe(network);
    });

    it('should create an InfuraProvider without api key and api key secret', async () => {
      const network = 'sepolia';

      jest.spyOn(configService, 'get').mockReturnValue(undefined);
      jest.spyOn(configService, 'get').mockReturnValue(undefined);

      const provider = web3Service.getInfuraProvider(network);

      const providerNetwork = await provider.getNetwork();

      expect(provider).toBeInstanceOf(InfuraProvider);
      expect(providerNetwork.name).toBe(network);
    });
  });

  describe('getContractAt', () => {
    it('should create a contract instance', () => {
      const contract = web3Service.getContractAt<ERC20__factory, ERC20>(
        ERC20__factory,
        erc20address,
      );

      expect(contract).toBeDefined();
    });

    it('should create a contract instance with a custom runner', () => {
      const provider = web3Service.getInfuraProvider('sepolia');

      const contract = web3Service.getContractAt<ERC20__factory, ERC20>(
        ERC20__factory,
        erc20address,
        provider,
      );

      expect(contract).toBeDefined();
    });

    it('should throw an error if factory does not have a connect method', () => {
      const factory = {} as any;

      expect(() =>
        web3Service.getContractAt<ERC20__factory, ERC20>(factory, erc20address),
      ).toThrowError(`Method 'connect' not found on the factory.`);
    });
  });
});
