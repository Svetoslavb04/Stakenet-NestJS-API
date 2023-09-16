import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { EthereumAddressDTO } from '../dto/ethereumAdress.dto';
import { ContractDataQuery } from './dto/contract-data-query.dto';
import { StakenetService } from './stakenet.service';
import { StakenetPropertyWithUser } from './enum/stakenet-property-with-user.enum';
import { StakenetPropertyWithOwner } from './enum/stakenet-property-with-owner.enum';
import { StakenetPropertyWithSpender } from './enum/stakenet-property-with-spender.enum';
import { StakenetPropertyEnum } from './enum/stakenet-property.enum';

@Controller('contract')
export class StakenetController {
  constructor(private stakenet: StakenetService) {}

  @Get(':address')
  async index(
    @Param('') params: EthereumAddressDTO,
    @Query('') contractDataQuery: ContractDataQuery,
  ) {
    const { address } = params;
    const { property, user, owner, spender } = contractDataQuery;

    try {
      if (
        !(property in StakenetPropertyWithUser) &&
        !(property in StakenetPropertyWithOwner) &&
        !(property in StakenetPropertyWithSpender)
      ) {
        return await this.stakenet.getPropertyData(address, property);
      }

      if (property === StakenetPropertyEnum.userData) {
        return await this.stakenet.getUserData(address, user);
      }

      if (property in StakenetPropertyWithUser) {
        return await this.stakenet.getPropertyWithUserRequired(
          address,
          property,
          user,
        );
      }

      if (
        property in StakenetPropertyWithOwner &&
        property in StakenetPropertyWithSpender
      ) {
        return await this.stakenet.getPropertyWithOwnerAndSpender(
          address,
          property,
          owner,
          spender,
        );
      }
    } catch (error) {
      throw new BadRequestException(
        'Ethereum address is not an Stakenet contract',
      );
    }
    return true;
  }
}
