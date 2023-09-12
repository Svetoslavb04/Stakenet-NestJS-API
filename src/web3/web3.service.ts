import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Networkish, ethers } from 'ethers';

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
}
