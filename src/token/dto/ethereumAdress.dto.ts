import { IsEthereumAddress, IsNotEmpty } from 'class-validator';

export class EthereumAddress {
  @IsEthereumAddress()
  @IsNotEmpty()
  address: string;
}
