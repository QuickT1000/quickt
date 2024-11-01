import { DatabaseOptions } from '@libraries';

export const postgresConfig: DatabaseOptions = {
  database: 'postgres',
  port: 5432,
  user: 'test',
  password: 'test',
  host: 'unknown',
  connection_timeout: 5000,
  query_timeout: 10000,
  idle_timeout: 0
};
