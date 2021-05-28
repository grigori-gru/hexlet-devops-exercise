import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { AppModule } from './app/app.module';
import { UrlsModule } from './urls/urls.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) =>
                configService.get('database') as TypeOrmModuleOptions,
        }),
        ConfigModule,
        AppModule,
        UrlsModule,
    ],
})
export class MainModule {}
