import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export default (): { database: PostgresConnectionOptions } => {
    const extraOptions = process.env.DATABASE_URL
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

    return { database: { type: 'postgres', ...extraOptions } };
};
