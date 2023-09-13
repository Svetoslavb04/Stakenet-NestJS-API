import { Module } from '@nestjs/common';
import { StakenetController } from './stakenet.controller';

@Module({
  controllers: [StakenetController]
})
export class StakenetModule {}
