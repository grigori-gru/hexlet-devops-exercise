import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const env = process.env.NODE_ENV || 'development';
const SOURCE_PATH = env === 'test' ? 'src' : 'dist';

export default (
    runMigration?: boolean,
): { database: PostgresConnectionOptions } => {
    // https://github.com/typeorm/typeorm/issues/278
    // use script "heroku config:set PGSSLMODE=no-verify" to omit the ssl configuration
    const extraOptions: Omit<PostgresConnectionOptions, 'type'> = process.env
        .DATABASE_URL
        ? {
              url: process.env.DATABASE_URL,
          }
        : {
              host: process.env.DATABASE_HOST,
              port: Number(process.env.DATABASE_PORT),
              username: process.env.POSTGRES_USER,
              password: process.env.POSTGRES_PASSWORD,
              database: process.env.POSTGRES_DB,
          };

    return {
        database: {
            type: 'postgres',
            entities: [`${SOURCE_PATH}/modules/**/**.entity{.ts,.js}`],
            migrations: runMigration ? [`src/migrations/*.ts`] : [],
            synchronize: env === 'test',
            dropSchema: env === 'test',
            ...extraOptions,
        },
    };
};
