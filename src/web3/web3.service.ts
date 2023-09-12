import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ContractRunner, Networkish, ethers } from 'ethers';

@Injectable()
export class Web3Service {
  constructor(private config: ConfigService) {}

  getInfuraProvider(network: Networkish) {
    return new ethers.InfuraProvider(
      network,
      this.config.get('INFURA_API_KEY') || null,
      this.config.get('INFURA_API_KEY_SECRET') || null,
    );
  }

  getContractAt<TFactory, TContract>(
    factory: TFactory,
    address: string,
    runner?: ContractRunner,
  ): TContract {
    if (typeof factory['connect'] === 'function') {
      return factory['connect'](address, runner);
    }

    throw new Error(`Method 'connect' not found on the factory.`);
  }
}
