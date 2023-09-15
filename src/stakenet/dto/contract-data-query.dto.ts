import {
  IsEnum,
  IsNotEmpty,
  IsEthereumAddress,
  ValidateIf,
} from 'class-validator';
import { StakenetPropertyEnum } from '../enum/stakenet-property.enum';
import { StakenetPropertyWithRequiredUser } from '../enum/stakenet-property-with-required-user.enum';
import { StakenetPropertyWithOwner } from '../enum/stakenet-property-with-owner.enum';
import { StakenetPropertyWithSpender } from '../enum/stakenet-property-with-spender.enum';
import { Transform } from 'class-transformer';

export class ContractDataQuery {
  @IsEnum(StakenetPropertyEnum)
  @IsNotEmpty()
  property: string;

  @ValidateIf(
    (o: ContractDataQuery) => o.property in StakenetPropertyWithRequiredUser,
  )
  @Transform((o) =>
    o.obj.property in StakenetPropertyWithRequiredUser ? o.value : undefined,
  )
  @IsEthereumAddress()
  @IsNotEmpty()
  user: string;

  @ValidateIf((o) => o.property in StakenetPropertyWithOwner)
  @Transform((o) =>
    o.obj.property in StakenetPropertyWithOwner ? o.value : undefined,
  )
  @IsEthereumAddress()
  @IsNotEmpty()
  owner: string;

  @ValidateIf((o) => o.property in StakenetPropertyWithSpender)
  @Transform((o) =>
    o.obj.property in StakenetPropertyWithSpender ? o.value : undefined,
  )
  @IsEthereumAddress()
  @IsNotEmpty()
  spender: string;
}
