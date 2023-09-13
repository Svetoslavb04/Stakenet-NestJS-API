import { Injectable } from '@nestjs/common';
import { Web3Service } from 'src/web3/web3.service';

@Injectable()
export class TokenService {
  constructor(private web3: Web3Service) {}
}
