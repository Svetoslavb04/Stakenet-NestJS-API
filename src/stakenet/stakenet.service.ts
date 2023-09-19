import { Injectable } from '@nestjs/common';
import { Web3Service } from '../web3/web3.service';
import { Stakenet, Stakenet__factory } from '../../types/ethers-contracts';
import { ethers } from 'ethers';

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

    throw new Error('The contract does not have such function');
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

    throw new Error('The contract does not have such function');
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

    throw new Error('The contract does not have such function');
  }

  async getUserData(address: string, user: string) {
    const stakenet = this.createStakenetContract(address);

    const balance = await stakenet.balanceOf(user);
    const userHasStaked = await stakenet.userHasStaked(user);
    const userStakedTimestamp = await stakenet.userStakedTimestamp(user);
    const lockDurationInSeconds = await stakenet.lockDurationInSeconds();

    const yieldPercentage = await stakenet.yieldPercentage();
    const yieldDecimals = await stakenet.yieldDecimals();

    const reward =
      (balance * yieldPercentage) / ethers.parseUnits('100', yieldDecimals);

    return {
      balance,
      reward,
      lockDurationInSeconds,
      userHasPosition: balance > 0,
      userHasStaked,
      userStakedTimestamp,
    };
  }
}
