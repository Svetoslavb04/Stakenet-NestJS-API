import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { EthereumAddress } from './dto/ethereumAdress.dto';
import { Web3Service } from 'src/web3/web3.service';
import { ERC20, ERC20__factory } from 'types/ethers-contracts';

@Controller('token')
export class TokenController {
  constructor(private web3: Web3Service) {}

  @Get(':address')
  async index(@Param('') params: EthereumAddress) {
    try {
      const token = this.web3.getContractAt<ERC20__factory, ERC20>(
        ERC20__factory,
        params.address,
      );

      const name = await token.name();
      const symbol = await token.symbol();
      const decimalsBigIng = await token.decimals();

      return { name, symbol, decimals: decimalsBigIng.toString() };
    } catch (error) {
      throw new BadRequestException('Ethereum address is not an ERC20 token');
    }
  }
}
