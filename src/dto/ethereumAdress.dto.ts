import { IsNotEmpty } from 'class-validator';
import { IsEthereumAddress } from '../decorator/is-ethereum-addres.decorator';

export class EthereumAddressDTO {
  @IsEthereumAddress()
  @IsNotEmpty()
  address: string;
}
