import { Injectable } from '@nestjs/common';
import { Web3Service } from 'src/web3/web3.service';

@Injectable()
export class StakenetService {
  constructor(private web3: Web3Service) {}

  async getPropertyData(address: string, property: string) {}

  async getPropertyWithUserRequired(
    address: string,
    property: string,
    user: string,
  ) {}

  async getPropertyWithOwnerAndSpender(
    address: string,
    property: string,
    owner: string,
    spender: string,
  ) {}

  async getUserData(address: string, user: string) {}
}
