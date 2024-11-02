import { DatabaseOptions } from '@libraries/persistence';
import { getRequiredEnv } from '@libraries/runtime';

console.log(process.env['DW_DATABASE_DB'], ' <------ process.env[\'DW_DATABASE_DB\'] ------ ');


export const postgresConfig: DatabaseOptions = {
    database: getRequiredEnv('DW_DATABASE_DB'),
    port: +getRequiredEnv('DW_DATABASE_PORT'),
    user: getRequiredEnv('DW_DATABASE_USER'),
    password: getRequiredEnv('DW_DATABASE_PASSWORD'),
    host: getRequiredEnv('DW_DATABASE_HOST'),
    connection_timeout: +getRequiredEnv('DATABASE_CONNECTION_TIMEOUT_MS'),
    query_timeout: +getRequiredEnv('DATABASE_QUERY_TIMEOUT_MS'),
    idle_timeout: +getRequiredEnv('DATABASE_IDLE_TIMEOUT_MS')
};
