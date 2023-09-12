import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Web3Service {
  constructor(private config: ConfigService) {}
}
