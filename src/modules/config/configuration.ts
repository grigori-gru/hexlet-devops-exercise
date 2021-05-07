import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default (): { database: TypeOrmModuleOptions } => ({
    database: {
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
    },
});
