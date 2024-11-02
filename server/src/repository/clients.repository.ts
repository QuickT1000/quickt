import { databaseAdapter } from '../adapter/postgres';
import moment from 'moment';

moment.locale('de');

export class ClientsRepository {

  client: string;

  // Methode zum Lesen von Informationen über die Tabellen
  public async read(): Promise<any> {
    let queryString = `
      select
        n.nspname, c.relname
      from
        pg_class c
          join
        pg_namespace n on n.oid = c.relnamespace
      where
        c.relkind = 'r'
        and c.relname = 'translations';
    `;

    return await databaseAdapter.query(queryString);
  }

  // Methode zum Erstellen eines neuen Schemas mit den Tabellen "translations" und "configurations"
  public async create(body: any): Promise<any> {
    const { projectName } = body;

    let queryString = `
      -- Neues Schema erstellen
      CREATE SCHEMA IF NOT EXISTS "${projectName}";
      
      -- Tabelle "translations" erstellen
      CREATE TABLE IF NOT EXISTS "${projectName}".translations (
        id SERIAL PRIMARY KEY,
        key VARCHAR NOT NULL,
        value VARCHAR NOT NULL,
        country VARCHAR NOT NULL,
        language VARCHAR NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT now()
      );

      -- Indizes auf "key", "country" und "language" setzen
      CREATE INDEX IF NOT EXISTS idx_key ON "${projectName}".translations (key);
      CREATE INDEX IF NOT EXISTS idx_country ON "${projectName}".translations (country);
      CREATE INDEX IF NOT EXISTS idx_language ON "${projectName}".translations (language);

      -- Tabelle "configurations" erstellen
      CREATE TABLE IF NOT EXISTS "${projectName}".configurations (
        client_config JSONB NOT NULL
      );
    `;

    await databaseAdapter.query(queryString);

    return { created: true };
  }

  public async update(body: any) : Promise<any> {
    console.log(body, ' <------ body xxx ------ ');

  }

  public async delete(query: any): Promise<any> {
    const projectName = query.projectName;

    let queryString = `
      -- Schema und alle enthaltenen Tabellen löschen
      DROP SCHEMA IF EXISTS "${projectName}" CASCADE;
    `;

    await databaseAdapter.query(queryString);

    return { deleted: true };
  }
}
