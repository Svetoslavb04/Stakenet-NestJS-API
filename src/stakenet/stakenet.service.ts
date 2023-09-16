import { Injectable } from '@nestjs/common';
import { Web3Service } from 'src/web3/web3.service';
import { Stakenet, Stakenet__factory } from 'types/ethers-contracts';

@Injectable()
export class StakenetService {
  constructor(private web3: Web3Service) {}

  createStakenetContract(address: string) {
    return this.web3.getContractAt<Stakenet__factory, Stakenet>(
      Stakenet__factory,
      address,
    );
  }

  async getPropertyData(address: string, property: string) {
    const stakenet = this.createStakenetContract(address);

    if (typeof stakenet[property] === 'function') {
      return await stakenet[property]();
    }
  }

  async getPropertyWithUserRequired(
    address: string,
    property: string,
    user: string,
  ) {
    const stakenet = this.createStakenetContract(address);

    if (typeof stakenet[property] === 'function') {
      return await stakenet[property](user);
    }
  }

  async getPropertyWithOwnerAndSpender(
    address: string,
    property: string,
    owner: string,
    spender: string,
  ) {
    const stakenet = this.createStakenetContract(address);

    if (typeof stakenet[property] === 'function') {
      return await stakenet[property](owner, spender);
    }
  }

  async getUserData(address: string, user: string) {}
}
