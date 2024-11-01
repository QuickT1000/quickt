import { Adapter, PgsqlAdapter, PostgresProvider } from '../../libraries/persistence';
import { postgresConfig } from '../config/postgres.config';
import {Logger} from "../../libraries/logger";

export class Postgres {
  private readonly postgresAdapter: Adapter;

  constructor() {
    this.postgresAdapter = new PgsqlAdapter(new PostgresProvider().establishDbConnection(postgresConfig));
  }

  getPostgresAdapter(): Adapter {
    return this.postgresAdapter;
  }
}

export let databaseAdapter: Adapter;

export const initPostgresConnection = () => {
  Logger.info('init postgres');
  databaseAdapter = new Postgres().getPostgresAdapter();
};
