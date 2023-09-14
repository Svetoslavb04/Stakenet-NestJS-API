import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from '../token.module';
import { TokenController } from '../token.controller';
import { TokenService } from '../token.service';
import { Web3Module } from '../../web3/web3.module';

describe('TokenModule', () => {
  let tokenModule: TestingModule;

  beforeEach(async () => {
    tokenModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        Web3Module,
        TokenModule,
      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(tokenModule).toBeDefined();
  });

  it('should have the TokenController', () => {
    const tokenController = tokenModule.get<TokenController>(TokenController);
    expect(tokenController).toBeDefined();
  });

  it('should have the TokenService', () => {
    const tokenService = tokenModule.get<TokenService>(TokenService);
    expect(tokenService).toBeDefined();
  });
});
