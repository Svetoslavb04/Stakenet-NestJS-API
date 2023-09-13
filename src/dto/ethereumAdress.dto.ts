import { IsEthereumAddress, IsNotEmpty } from 'class-validator';

export class EthereumAddressDTO {
  @IsEthereumAddress()
  @IsNotEmpty()
  address: string;
}
