import { Global, Module } from '@nestjs/common';
import { Web3Service } from './web3.service';

@Global()
@Module({
  providers: [Web3Service],
})
export class Web3Module {}
