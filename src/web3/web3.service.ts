import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  BaseContract,
  ContractRunner,
  EventLog,
  Networkish,
  InfuraProvider,
} from 'ethers';

@Injectable()
export class Web3Service {
  constructor(private config: ConfigService) {}

  getInfuraProvider(network: Networkish) {
    return new InfuraProvider(
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
    if (!runner) {
      runner = this.getInfuraProvider('sepolia');
    }

    if (typeof factory['connect'] === 'function') {
      return factory['connect'](address, runner);
    }

    throw new Error(`Method 'connect' not found on the factory.`);
  }

  async getEvents<TContract extends BaseContract>(
    contract: TContract,
    event: string,
    ...args
  ): Promise<EventLog[]> {
    const filter = contract.filters[event](...args);

    const events = (await contract.queryFilter(filter)) as EventLog[];

    return events;
  }
}
