import { ContractDataQuery } from '../dto/contract-data-query.dto';
import { StakenetPropertyEnum } from '../enum/stakenet-property.enum';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

describe('ContractDataQuery DTO', () => {
  it('should pass DTO', async () => {
    const dtoObj = {
      property: StakenetPropertyEnum.erc20,
      user: '0x2f1c',
      owner: '0x2f1cb261ba1c',
      spender: '0x2f1cb261ba13',
    };

    const ofDtoObj = plainToInstance(ContractDataQuery, dtoObj);
    const errors = await validate(ofDtoObj);

    expect(errors.length).toBe(0);
  });

  it('should trim redundant properties', async () => {
    const dtoObj = {
      property: StakenetPropertyEnum.erc20,
      user: '0x2f1c',
      owner: '0x2f1cb261ba1c',
      spender: '0x2f1cb261ba13',
    };

    const ofDtoObj = plainToInstance(ContractDataQuery, dtoObj);
    const errors = await validate(ofDtoObj);

    expect(ofDtoObj.owner).not.toBeDefined();
    expect(ofDtoObj.spender).not.toBeDefined();
    expect(ofDtoObj.user).not.toBeDefined();
  });

  it('should throw on missing user', async () => {
    const dtoObj = {
      property: StakenetPropertyEnum.userData,
    };

    const ofDtoObj = plainToInstance(ContractDataQuery, dtoObj);
    const errors = await validate(ofDtoObj);

    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain('user should not be empty');
    expect(JSON.stringify(errors)).toContain(
      'user must be an Ethereum address',
    );
  });

  it('should not remove user if property requires it', async () => {
    const dtoObj = {
      property: StakenetPropertyEnum.userData,
      user: '0x9E7Dfa2BDDb16dB51349610161a5BeE8486b6c86',
    };

    const ofDtoObj = plainToInstance(ContractDataQuery, dtoObj);
    const errors = await validate(ofDtoObj);

    expect(errors.length).toBe(0);
    expect(ofDtoObj.user).toEqual('0x9E7Dfa2BDDb16dB51349610161a5BeE8486b6c86');
  });

  it('should throw on missing owner, spender', async () => {
    const dtoObj = {
      property: StakenetPropertyEnum.allowance,
      owner: undefined,
      spender: undefined,
    };

    let ofDtoObj = plainToInstance(ContractDataQuery, dtoObj);
    let errors = await validate(ofDtoObj);

    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain('owner should not be empty');
    expect(JSON.stringify(errors)).toContain(
      'owner must be an Ethereum address',
    );
    expect(JSON.stringify(errors)).toContain('spender should not be empty');
    expect(JSON.stringify(errors)).toContain(
      'spender must be an Ethereum address',
    );
  });
});
