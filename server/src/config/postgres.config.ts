import { DatabaseOptions } from '@libraries/persistence';

export const postgresConfig: DatabaseOptions = {
    database: process.env['DATABASE_DB'],
    port: +process.env['DATABASE_PORT'],
    user: process.env['DATABASE_USER'],
    password: process.env['DATABASE_PASSWORD'],
    host: process.env['DATABASE_HOST'],
    connection_timeout: +process.env['DATABASE_CONNECTION_TIMEOUT_MS'],
    query_timeout: +process.env['DATABASE_QUERY_TIMEOUT_MS'],
    idle_timeout: +process.env['DATABASE_IDLE_TIMEOUT_MS']
};
