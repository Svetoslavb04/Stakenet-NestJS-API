import { Injectable } from '@nestjs/common';
import { Web3Service } from '../web3/web3.service';
import { ERC20, ERC20__factory } from '../../types/ethers-contracts';
import { EthereumAddressDTO } from '../dto/ethereumAdress.dto';
import { AddressLike } from 'ethers';

@Injectable()
export class TokenService {
  constructor(private web3: Web3Service) {}

  async getTokenBaseInformation(address: string) {
    const token = this.web3.getContractAt<ERC20__factory, ERC20>(
      ERC20__factory,
      address,
    );

    const name = await token.name();
    const symbol = await token.symbol();
    const decimals = await token.decimals();

    return { name, symbol, decimals: decimals.toString() };
  }
}
