import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { EthereumAddressDTO } from '../dto/ethereumAdress.dto';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private token: TokenService) {}

  @Get(':address')
  async index(@Param('') params: EthereumAddressDTO) {
    try {
      const tokenInformation = await this.token.getTokenBaseInformation(
        params.address,
      );
      return tokenInformation;
    } catch (error) {
      throw new BadRequestException('Ethereum address is not an ERC20 token');
    }
  }
}
