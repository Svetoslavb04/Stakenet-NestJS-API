import { Injectable } from '@nestjs/common';
import { Web3Service } from 'src/web3/web3.service';
import { ERC20, ERC20__factory } from 'types/ethers-contracts';
import { EthereumAddressDTO } from '../dto/ethereumAdress.dto';

@Injectable()
export class TokenService {
  constructor(private web3: Web3Service) {}

  async getTokenBaseInformation(addressObject: EthereumAddressDTO) {
    const token = this.web3.getContractAt<ERC20__factory, ERC20>(
      ERC20__factory,
      addressObject.address,
    );

    const name = await token.name();
    const symbol = await token.symbol();
    const decimals = await token.decimals();

    return { name, symbol, decimals: decimals.toString() };
  }
}
