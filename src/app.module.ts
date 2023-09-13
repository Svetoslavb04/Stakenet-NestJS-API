import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './token/token.module';
import { Web3Module } from './web3/web3.module';
import { StakenetModule } from './stakenet/stakenet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TokenModule,
    Web3Module,
    StakenetModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
