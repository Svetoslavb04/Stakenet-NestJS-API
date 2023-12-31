import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('StakenetController (e2e)', () => {
  let app: INestApplication;

  const prefix = '/contract/0x258fCe6D2F82A45Fed7120211aa445F1fa16E05f';

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
    await app.listen(3335);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/contract/:address (GET)', () => {
    it('should return correct property information', async () => {
      request(app.getHttpServer())
        .get(
          '/contract/0x25eF4D21979a2dB912183c133A3e576cf710d1A7?property=totalRewards',
        )
        .expect(200, {
          data: {
            raw: '100000000000000000000',
            totalRewards: {
              wei: '100000000000000000000',
              gwei: '100000000000.0',
              ether: '100.0',
            },
          },
        });
    });

    it('should return correct property information that requires user', async () => {
      request(app.getHttpServer())
        .get(
          '/contract/0x25eF4D21979a2dB912183c133A3e576cf710d1A7?property=userHasStaked&user=0x0c9276b8bAf2b37140679204027d574AC2D71297',
        )
        .expect(200, {
          data: true,
        });
    });

    //userData and allowance cannot be tested because they can be different at some point

    it('should throw Bad Request if property query param is not provided', async () => {
      return request(app.getHttpServer())
        .get(prefix)
        .expect(400, {
          message: [
            'property should not be empty',
            'property must be one of the following values: erc20, lockDurationInSeconds, yieldPercentage, yieldDecimals, userHasStaked, userStakedTimestamp, totalRewards, rewards, contractStakeLimit, userStakeLimit, userMinimumStake, calculateMinStake, totalSupply, symbol, name, decimals, balanceOf, allowance, userData',
          ],
          error: 'Bad Request',
          statusCode: 400,
        });
    });

    it('should throw if user is missing', async () => {
      return request(app.getHttpServer())
        .get(prefix + '?property=userData')
        .expect(400, {
          message: [
            'user should not be empty',
            'user must be an Ethereum address',
          ],
          error: 'Bad Request',
          statusCode: 400,
        });
    });

    it('should throw if owner, spender are missing', async () => {
      request(app.getHttpServer())
        .get(prefix + '?property=allowance')
        .expect(400, {
          message: [
            'owner should not be empty',
            'owner must be an Ethereum address',
            'spender should not be empty',
            'spender must be an Ethereum address',
          ],
          error: 'Bad Request',
          statusCode: 400,
        });

      request(app.getHttpServer())
        .get(
          prefix +
            '?property=allowance&owner=0x258fCe6D2F82A45Fed7120211aa445F1fa16E05f',
        )
        .expect(400, {
          message: [
            'spender should not be empty',
            'spender must be an Ethereum address',
          ],
          error: 'Bad Request',
          statusCode: 400,
        });

      request(app.getHttpServer())
        .get(
          prefix +
            '?property=allowance&spender=0x258fCe6D2F82A45Fed7120211aa445F1fa16E05f',
        )
        .expect(400, {
          message: [
            'owner should not be empty',
            'owner must be an Ethereum address',
          ],
          error: 'Bad Request',
          statusCode: 400,
        });
    });
  });
});
