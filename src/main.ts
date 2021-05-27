import { NestFactory } from '@nestjs/core';
import { MainModule } from './modules';

async function bootstrap() {
    const app = await NestFactory.create(MainModule);
    // https://github.com/keystonejs/keystone-classic/issues/3994
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
