import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('TokenController (e2e)', () => {
  let app: INestApplication;

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
    await app.listen(3334);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/token/:address (GET)', () => {
    it('Should return correct token information', async () => {
      return request(app.getHttpServer())
        .get('/token/0x2BdFb6a7B89e933B0A8c34E3dcc32E8C684c7738')
        .expect(200, {
          name: 'LimeSpark',
          symbol: 'LSK',
          decimals: '18',
        });
    });

    it('Should throw BadRequest on Ethereum address that is not ERC20 Token', async () => {
      return request(app.getHttpServer())
        .get('/token/0x9120250530053c5350B34Ebcd3f3824f33a0d167')
        .expect(400, {
          message: 'Ethereum address is not an ERC20 token',
          error: 'Bad Request',
          statusCode: 400,
        });
    });

    it('Should throw BadRequest on invalid Ethereum address', async () => {
      return request(app.getHttpServer())
        .get('/token/invalid-address')
        .expect(400, {
          message: ['address must be an Ethereum address'],
          error: 'Bad Request',
          statusCode: 400,
        });
    });
  });
});
