import { Controller, Get, Param } from '@nestjs/common';
import { EthereumAddress } from './dto/ethereumAdress.dto';
import { Web3Service } from 'src/web3/web3.service';

@Controller('token')
export class TokenController {
  constructor(private web3: Web3Service) {}

  @Get(':address')
  index(@Param('') params: EthereumAddress) {
    return params;
  }
}
