import { Module } from '@nestjs/common';
import { StakenetController } from './stakenet.controller';
import { StakenetService } from './stakenet.service';

@Module({
  controllers: [StakenetController],
  providers: [StakenetService]
})
export class StakenetModule {}
