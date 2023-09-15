import { Controller, Get, Param, Query } from '@nestjs/common';
import { EthereumAddressDTO } from '../dto/ethereumAdress.dto';
import { ContractDataQuery } from './dto/contract-data-query.dto';

@Controller('contract')
export class StakenetController {
  @Get(':address')
  async index(
    @Param('') params: EthereumAddressDTO,
    @Query('') contractDataQuery: ContractDataQuery,
  ) {
    return { params, contractDataQuery };
  }
}
