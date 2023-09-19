import { of } from 'rxjs';
import { FormatDataInterceptor } from './format-data.interceptor';
import { ExecutionContext, CallHandler } from '@nestjs/common';

describe('FormatDataInterceptor', () => {
  let interceptor = new FormatDataInterceptor();

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  it('should format lockDurationInSeconds property (number)', async () => {
    const context = {
      getArgs() {
        return [{ query: { property: 'lockDurationInSeconds' } }];
      },
    } as ExecutionContext;

    const next = {
      handle: () => of(86400n),
    } as CallHandler;

    const formattedData: any = await interceptor
      .intercept(context, next)
      .toPromise();

    expect(formattedData.data).toBeDefined();
    expect(formattedData.data.raw).toEqual(86400);
    expect(typeof formattedData.data.lockDurationIn).toEqual('object');
    expect(formattedData.data.lockDurationIn.days).toEqual(1);
    expect(formattedData.data.lockDurationIn.hours).toEqual(24);
    expect(formattedData.data.lockDurationIn.minutes).toEqual(1440);
    expect(formattedData.data.lockDurationIn.seconds).toEqual(86400);
    expect(formattedData.data.lockDurationIn.milliseconds).toEqual(86400000);
  });

  it('should format lockDurationInSeconds property (bigint)', async () => {
    const context = {
      getArgs() {
        return [{ query: { property: 'lockDurationInSeconds' } }];
      },
    } as ExecutionContext;

    const next = {
      handle: () => of(999007199254740991n),
    } as CallHandler;

    const formattedData: any = await interceptor
      .intercept(context, next)
      .toPromise();

    expect(formattedData.data).toBeDefined();
    expect(formattedData.data.raw).toBe('999007199254740991');
    expect(typeof formattedData.data.lockDurationIn).toEqual('object');
    expect(formattedData.data.lockDurationIn.days).toBe('11562583324707');
    expect(formattedData.data.lockDurationIn.hours).toBe('277501999792983');
    expect(formattedData.data.lockDurationIn.minutes).toBe('16650119987579016');
    expect(formattedData.data.lockDurationIn.seconds).toBe(
      '999007199254740991',
    );
    expect(formattedData.data.lockDurationIn.milliseconds).toBe(
      '999007199254740991000',
    );
  });

  it('should format lockDurationInSeconds property (string valid number)', async () => {
    const context = {
      getArgs() {
        return [{ query: { property: 'lockDurationInSeconds' } }];
      },
    } as ExecutionContext;

    const next = {
      handle: () => of('86400'),
    } as CallHandler;

    const formattedData: any = await interceptor
      .intercept(context, next)
      .toPromise();

    expect(formattedData.data).toBeDefined();
    expect(formattedData.data.raw).toEqual(86400);
    expect(typeof formattedData.data.lockDurationIn).toEqual('object');
    expect(formattedData.data.lockDurationIn.days).toEqual(1);
    expect(formattedData.data.lockDurationIn.hours).toEqual(24);
    expect(formattedData.data.lockDurationIn.minutes).toEqual(1440);
    expect(formattedData.data.lockDurationIn.seconds).toEqual(86400);
    expect(formattedData.data.lockDurationIn.milliseconds).toEqual(86400000);
  });

  it('should format lockDurationInSeconds property (string invalid number)', async () => {
    const context = {
      getArgs() {
        return [{ query: { property: 'lockDurationInSeconds' } }];
      },
    } as ExecutionContext;

    const next = {
      handle: () => of('adasd'),
    } as CallHandler;

    const formattedData: any = await interceptor
      .intercept(context, next)
      .toPromise();

    expect(formattedData.data).toBe('adasd');
  });

  it('should format lockDurationInSeconds property (object)', async () => {
    const context = {
      getArgs() {
        return [{ query: { property: 'lockDurationInSeconds' } }];
      },
    } as ExecutionContext;

    const next = {
      handle: () => of({ hello: 'value' }),
    } as CallHandler;

    const formattedData: any = await interceptor
      .intercept(context, next)
      .toPromise();

    expect(formattedData.data).toStrictEqual({ hello: 'value' });
  });

  it('should format userStakedTimestamp property', async () => {
    const context = {
      getArgs() {
        return [{ query: { property: 'userStakedTimestamp' } }];
      },
    } as ExecutionContext;

    const next = {
      handle: () => of(1695122496n),
    } as CallHandler;

    const formattedData: any = await interceptor
      .intercept(context, next)
      .toPromise();

    expect(formattedData.data).toBeDefined();
    expect(formattedData.data.raw).toBe(1695122496);
    expect(formattedData.data.userStakedTimestamp.timestampInSeconds).toBe(
      1695122496,
    );
    expect(formattedData.data.userStakedTimestamp.timestampInMilliseconds).toBe(
      1695122496000,
    );
    expect(formattedData.data.userStakedTimestamp.dateObject).toBe(
      '2023-09-19 14:21:36',
    );
  });

  it('should format userStakedTimestamp property (string valid number)', async () => {
    const context = {
      getArgs() {
        return [{ query: { property: 'userStakedTimestamp' } }];
      },
    } as ExecutionContext;

    const next = {
      handle: () => of('1695122496'),
    } as CallHandler;

    const formattedData: any = await interceptor
      .intercept(context, next)
      .toPromise();

    expect(formattedData.data).toBeDefined();
    expect(formattedData.data.raw).toBe(1695122496);
    expect(formattedData.data.userStakedTimestamp.timestampInSeconds).toBe(
      1695122496,
    );
    expect(formattedData.data.userStakedTimestamp.timestampInMilliseconds).toBe(
      1695122496000,
    );
    expect(formattedData.data.userStakedTimestamp.dateObject).toBe(
      '2023-09-19 14:21:36',
    );
  });

  it('should format userStakedTimestamp property (string invalid number)', async () => {
    const context = {
      getArgs() {
        return [{ query: { property: 'userStakedTimestamp' } }];
      },
    } as ExecutionContext;

    const next = {
      handle: () => of('invalid-number'),
    } as CallHandler;

    const formattedData: any = await interceptor
      .intercept(context, next)
      .toPromise();

    expect(formattedData.data).toBe('invalid-number');
  });

  it('should format userStakedTimestamp property (object)', async () => {
    const context = {
      getArgs() {
        return [{ query: { property: 'userStakedTimestamp' } }];
      },
    } as ExecutionContext;

    const next = {
      handle: () => of({ value: 'invalid-number' }),
    } as CallHandler;

    const formattedData: any = await interceptor
      .intercept(context, next)
      .toPromise();

    expect(formattedData.data).toStrictEqual({ value: 'invalid-number' });
  });

  it('should format if property return value is wei (BigInt)', async () => {
    const context = {
      getArgs() {
        return [{ query: { property: 'rewards' } }];
      },
    } as ExecutionContext;

    const next = {
      handle: () => of(332351235n),
    } as CallHandler;

    const formattedData = await interceptor
      .intercept(context, next)
      .toPromise();

    expect(formattedData.data).toBeDefined();
    expect(formattedData).toStrictEqual({
      data: {
        raw: '332351235',
        rewards: {
          wei: '332351235',
          gwei: '0.332351235',
          ether: '0.000000000332351235',
        },
      },
    });
  });

  it('should format if property value is wei (string valid)', async () => {
    const context = {
      getArgs() {
        return [{ query: { property: 'rewards' } }];
      },
    } as ExecutionContext;

    const next = {
      handle: () => of('332351235'),
    } as CallHandler;

    const formattedData = await interceptor
      .intercept(context, next)
      .toPromise();

    expect(formattedData.data).toBeDefined();
    expect(formattedData).toStrictEqual({
      data: {
        raw: '332351235',
        rewards: {
          wei: '332351235',
          gwei: '0.332351235',
          ether: '0.000000000332351235',
        },
      },
    });
  });

  it('should format if property value is wei (string invalid)', async () => {
    const context = {
      getArgs() {
        return [{ query: { property: 'rewards' } }];
      },
    } as ExecutionContext;

    const next = {
      handle: () => of('asd'),
    } as CallHandler;

    const formattedData = await interceptor
      .intercept(context, next)
      .toPromise();

    expect(formattedData.data).toBeDefined();
    expect(formattedData.data).toBe('asd');
  });

  it('should format if property value is wei (bool)', async () => {
    const context = {
      getArgs() {
        return [{ query: { property: 'rewards' } }];
      },
    } as ExecutionContext;

    const next = {
      handle: () => of(false),
    } as CallHandler;

    const formattedData = await interceptor
      .intercept(context, next)
      .toPromise();

    expect(formattedData.data).toBeDefined();
    expect(formattedData.data).toBe(false);
  });

  it('should format if property is userData and has a position', async () => {
    const context = {
      getArgs() {
        return [{ query: { property: 'userData', user: 'some user' } }];
      },
    } as ExecutionContext;

    const next = {
      handle: () =>
        of({
          balance: 10000000000000000000n,
          reward: 3333330000000000000n,
          lockDurationInSeconds: 86400n,
          userHasPosition: true,
          userHasStaked: true,
          userStakedTimestamp: 1695122496n,
        }),
    } as CallHandler;

    const formattedData = await interceptor
      .intercept(context, next)
      .toPromise();

    expect(formattedData).toStrictEqual({
      data: {
        userHasPosition: true,
        balance: {
          wei: '10000000000000000000',
          gwei: '10000000000.0',
          ether: '10.0',
        },
        reward: {
          wei: '3333330000000000000',
          gwei: '3333330000.0',
          ether: '3.33333',
        },
        userHasStaked: true,
        userStakedTimestamp: {
          timestamp: 1695122496,
          timestampInMilliseconds: 1695122496000,
          dateObject: '2023-09-19 14:21:36',
        },
        canWithdrawAfter: {
          timestamp: 1695208896,
          timestampInMilliseconds: 1695208896000,
          dateObject: '2023-09-20 14:21:36',
        },
      },
    });
  });

  it('should format if property is userData and has NOT a position', async () => {
    const context = {
      getArgs() {
        return [{ query: { property: 'userData', user: 'some user' } }];
      },
    } as ExecutionContext;

    const next = {
      handle: () =>
        of({
          balance: 0n,
          reward: 0n,
          lockDurationInSeconds: 86400n,
          userHasPosition: false,
          userHasStaked: true,
          userStakedTimestamp: 0n,
        }),
    } as CallHandler;

    const formattedData = await interceptor
      .intercept(context, next)
      .toPromise();

    expect(formattedData).toStrictEqual({
      data: {
        userHasPosition: false,
        balance: {
          wei: '0',
          gwei: '0.0',
          ether: '0.0',
        },
        reward: {
          wei: '0',
          gwei: '0.0',
          ether: '0.0',
        },
        userHasStaked: true,
        userStakedTimestamp: {
          timestamp: 0,
          timestampInMilliseconds: 0,
          dateObject: 0,
        },
        canWithdrawAfter: {
          timestamp: 0,
          timestampInMilliseconds: 0,
          dateObject: 0,
        },
      },
    });
  });

  it('should format if no property in query', async () => {
    const context = {
      getArgs() {
        return [{ query: {} }];
      },
    } as ExecutionContext;

    const next = {
      handle: () => of('some value'),
    } as CallHandler;

    const formattedData = await interceptor
      .intercept(context, next)
      .toPromise();

    expect(formattedData.data).toBeDefined();
    expect(formattedData.data).toEqual('some value');

    const nextWithBigNumber = {
      handle: () => of(99007199254740991n),
    } as CallHandler;

    const formattedData2 = await interceptor
      .intercept(context, nextWithBigNumber)
      .toPromise();

    expect(formattedData2.data).toBeDefined();
    expect(formattedData2.data).toEqual('99007199254740991');
  });

  it('should format if property not in StakenetPropertyEnum', async () => {
    const context = {
      getArgs() {
        return [{ query: { property: 'someCoolProperty' } }];
      },
    } as ExecutionContext;

    const next = {
      handle: () => of('some value'),
    } as CallHandler;

    const formattedData = await interceptor
      .intercept(context, next)
      .toPromise();

    expect(formattedData.data).toBeDefined();
    expect(formattedData.data).toEqual('some value');

    const nextWithBigNumber = {
      handle: () => of(99007199254740991n),
    } as CallHandler;

    const formattedData2 = await interceptor
      .intercept(context, nextWithBigNumber)
      .toPromise();

    expect(formattedData2.data).toBeDefined();
    expect(formattedData2.data).toEqual('99007199254740991');
  });
});
