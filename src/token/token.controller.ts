import { Controller, Get, Param } from '@nestjs/common';
import { EthereumAddress } from './dto/ethereumAdress.dto';

@Controller('token')
export class TokenController {
  @Get(':address')
  index(@Param('') params: EthereumAddress) {
    return params;
  }
}
