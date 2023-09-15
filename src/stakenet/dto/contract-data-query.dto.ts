import {
  IsEnum,
  IsNotEmpty,
  IsEthereumAddress,
  ValidateIf,
} from 'class-validator';
import { StakenetPropertyEnum } from '../enum/stakenet-property.enum';
import { StaknetPropertyWithRequiredUser } from '../enum/staknet-property-with-required-user.enum';
import { StaknetPropertyWithOwner } from '../enum/staknet-property-with-owner.enum';
import { StaknetPropertyWithSpender } from '../enum/staknet-property-with-spender.enum';
import { Transform } from 'class-transformer';

export class ContractDataQuery {
  @IsEnum(StakenetPropertyEnum)
  @IsNotEmpty()
  property: string;

  @ValidateIf(
    (o: ContractDataQuery) => o.property in StaknetPropertyWithRequiredUser,
  )
  @Transform((o) =>
    o.obj.property in StaknetPropertyWithRequiredUser ? o.value : undefined,
  )
  @IsEthereumAddress()
  @IsNotEmpty()
  user: string;

  @ValidateIf((o) => o.property in StaknetPropertyWithOwner)
  @Transform((o) =>
    o.obj.property in StaknetPropertyWithOwner ? o.value : undefined,
  )
  @IsEthereumAddress()
  @IsNotEmpty()
  owner: string;

  @ValidateIf((o) => o.property in StaknetPropertyWithSpender)
  @Transform((o) =>
    o.obj.property in StaknetPropertyWithSpender ? o.value : undefined,
  )
  @IsEthereumAddress()
  @IsNotEmpty()
  spender: string;
}
