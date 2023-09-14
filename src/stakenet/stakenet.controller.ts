import { Controller, Get, Param } from '@nestjs/common';
import { EthereumAddressDTO } from '../dto/ethereumAdress.dto';

@Controller('contract')
export class StakenetController {
  @Get(':address')
  async index(@Param('') params: EthereumAddressDTO) {
    return null;
  }
}
