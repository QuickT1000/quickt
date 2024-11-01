import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { DatabaseOptions } from '../models/database-options.model';
import { resolve } from 'path';

type TestDatabaseOptions = Omit<DatabaseOptions, 'host'>;

export class DatabaseTestingUtility {
    private readonly testDbOptions: TestDatabaseOptions = {
        user: 'test',
        password: 'test',
        database: 'test',
        port: 5432,
        query_timeout: 5000,
        connection_timeout: 2000,
        idle_timeout: 0
    };

    private startedContainer: StartedTestContainer;

    private dbOptions: DatabaseOptions;

    /**
     * starts a database within a container
     * @returns the options to connect to the started database
     */
    public async startDb(configPostgres: DatabaseOptions): Promise<DatabaseOptions> {
        try {
            const buildContext = resolve(__dirname, process.cwd() + '/../migration-service/migrations');
            const container = await GenericContainer.fromDockerfile(buildContext).build();

            this.startedContainer = await container
                .withExposedPorts(this.testDbOptions.port)
                .withEnvironment({
                    POSTGRES_USER: this.testDbOptions.user,
                    POSTGRES_PASSWORD: this.testDbOptions.password,
                    POSTGRES_DB: this.testDbOptions.database
                })
                .start();

            this.dbOptions = {
                ...this.testDbOptions,
                host: this.startedContainer.getHost(),
                port: this.startedContainer.getMappedPort(this.testDbOptions.port)
            };

            Object.assign(configPostgres, {
                ...configPostgres,
                ...this.dbOptions
            });

            return configPostgres;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async teardown(): Promise<void> {
        await this.startedContainer.stop();
    }
}
