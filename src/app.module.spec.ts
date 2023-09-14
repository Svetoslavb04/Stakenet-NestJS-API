import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenModule } from './token/token.module';
import { Web3Module } from './web3/web3.module';
import { StakenetModule } from './stakenet/stakenet.module';

describe('AppModule', () => {
  let appModule: TestingModule;

  beforeEach(async () => {
    appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(appModule).toBeDefined();
  });

  it('should import ConfigModule', () => {
    const configModule = appModule.get<ConfigModule>(ConfigModule);
    expect(configModule).toBeDefined();
  });

  it('should import TokenModule', () => {
    const tokenModule = appModule.get<TokenModule>(TokenModule);
    expect(tokenModule).toBeDefined();
  });

  it('should import Web3Module', () => {
    const web3Module = appModule.get<Web3Module>(Web3Module);
    expect(web3Module).toBeDefined();
  });

  it('should import StakenetModule', () => {
    const stakenetModule = appModule.get<StakenetModule>(StakenetModule);
    expect(stakenetModule).toBeDefined();
  });

  it('should have ConfigService as a provider', () => {
    const configService = appModule.get<ConfigService>(ConfigService);
    expect(configService).toBeDefined();
  });
});
