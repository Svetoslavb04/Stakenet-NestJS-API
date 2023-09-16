import { registerDecorator, ValidationOptions } from 'class-validator';
import { ethers } from 'ethers';

export function IsEthereumAddress(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsEthereumAddress',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return ethers.isAddress(value);
        },
        defaultMessage: () => `${propertyName} must be an Ethereum address`,
      },
    });
  };
}
//must be an Ethereum address
