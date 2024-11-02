import { Pool, PoolClient } from 'pg';
import { Adapter } from '../models/adapter.model';

export class PgsqlAdapter implements Adapter {
    constructor(private databaseConnectionPool: Pool) {}

    async query(query: string): Promise<any[]> {
        let client: PoolClient | undefined;
        try {
            client = await this.databaseConnectionPool.connect();
            const { rows } = await client.query(query);
            return rows;
        } catch (err) {
            console.error(`DB Error! query: "${query}", error: "${err}"`);
            throw err;
        } finally {
            client?.release();
        }
    }

    async end(): Promise<void> {
        await this.databaseConnectionPool.end();
    }
}
