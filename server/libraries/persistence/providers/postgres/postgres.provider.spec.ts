import { DatabaseOptions } from '../../models/database-options.model';
import { PostgresProvider } from './postgres.provider';
import { Pool } from 'pg';

jest.mock('pg');
describe('Postgres Provider', () => {
    it('establishDbConnection() - should establish a db connection with the provided database options', () => {
        // Given
        const postgresProvider = new PostgresProvider();
        const options: DatabaseOptions = {
            user: 'user',
            password: 'password',
            host: 'host',
            port: 5000,
            database: 'database',
            connection_timeout: 5000,
            query_timeout: 2000,
            idle_timeout: 0
        };

        // When
        const actual = postgresProvider.establishDbConnection(options);

        // Then
        expect(actual).toBeTruthy();
        expect(Pool).toHaveBeenCalledWith({
            user: 'user',
            password: 'password',
            host: 'host',
            port: 5000,
            database: 'database',
            connectionTimeoutMillis: 5000,
            query_timeout: 2000,
            idleTimeoutMillis: 0,
            ssl: false
        });
    });
});
