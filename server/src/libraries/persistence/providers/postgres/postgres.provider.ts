import { Pool } from 'pg';
import { DatabaseOptions } from '../../models/database-options.model';

export class PostgresProvider {
    public establishDbConnection(options: DatabaseOptions): Pool {
        const poolConfig = {
            user: options.user,
            password: options.password,
            database: options.database,
            host: options.host,
            port: options.port,
            connectionTimeoutMillis: options.connection_timeout,
            query_timeout: options.query_timeout,
            idleTimeoutMillis: options.idle_timeout,
            ssl: false
        };

        console.debug('Database Connection will be established with config:', poolConfig);

        return new Pool(poolConfig);
    }
}
