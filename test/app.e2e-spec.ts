import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MainModule } from '../src/modules';

describe('Cats', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [MainModule],
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    it(`/GET`, () =>
        request(app.getHttpServer())
            .get('/')
            .expect(200)
            .expect('Hello World!'));

    afterAll(async () => {
        await app.close();
    });
});
