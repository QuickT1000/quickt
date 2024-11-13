import { databaseAdapter } from '../adapter/postgres';
import moment from 'moment';

moment.locale('de');

export class ProjectsRepository {

  client: string;

  public async read({ pageSize = 10, pageIndex = 1, projectName = '' }): Promise<any> {
    const offset = (pageIndex - 1) * pageSize;

    // Abfrage für die Daten mit Pagination und Schema-BaseFilter
    const queryString = `
    select
      n.nspname, c.relname
    from
      pg_class c
        join
      pg_namespace n on n.oid = c.relnamespace
    where
      c.relkind = 'r'
      and c.relname = 'translations'
      ${projectName ? `and n.nspname like '%${projectName}%'` : ''}
    limit ${pageSize}
    offset ${offset};
  `;

    // Abfrage für die Gesamtzahl der Einträge mit Schema-BaseFilter
    const countQuery = `
    select
      count(*) as total
    from
      pg_class c
        join
      pg_namespace n on n.oid = c.relnamespace
    where
      c.relkind = 'r'
      and c.relname = 'translations'
      ${projectName ? `and n.nspname like '%${projectName}%'` : ''};
  `;

    // Führe beide Abfragen aus
    const entries = await databaseAdapter.query(queryString);
    const countResult = await databaseAdapter.query(countQuery);
    const total = countResult[0]?.total || 0;

    return {
      entries,
      pagination: {
        total: Number(total),
        pageIndex: Number(pageIndex),
        pageSize: Number(pageSize),
      },
    };
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
        id SERIAL PRIMARY KEY,
        locales JSONB NOT NULL,
        "defaultLocale" VARCHAR NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT now()
      );
    `;

    await databaseAdapter.query(queryString);

    return { created: true };
  }

  public async update(body: any) : Promise<any> {
     // update not necessary yet! only projectName could be updated.
  }

  public async delete(projectName: string): Promise<any> {
    try {
      await databaseAdapter.query(`DROP SCHEMA IF EXISTS "${projectName}" CASCADE;`);
      return { deleted: true };
    } catch (e) {
      console.log(e);
    }
  }
}
