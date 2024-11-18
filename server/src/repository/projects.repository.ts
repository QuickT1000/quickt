import { databaseAdapter } from '../adapter/postgres';
import moment from 'moment';

moment.locale('de');

export class ProjectsRepository {

  public async read({ pageSize = 10, pageIndex = 1, projectId = '' }): Promise<any> {
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
      ${projectId ? `and n.nspname like '%${projectId}%'` : ''}
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
      ${projectId ? `and n.nspname like '%${projectId}%'` : ''};
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
    const { projectId } = body;

    let queryString = `
      -- Neues Schema erstellen
      CREATE SCHEMA IF NOT EXISTS "${projectId}";
      
      -- Tabelle "translations" erstellen
      CREATE TABLE IF NOT EXISTS "${projectId}".translations (
        id SERIAL PRIMARY KEY,
        key VARCHAR NOT NULL,
        value VARCHAR NOT NULL,
        country VARCHAR NOT NULL,
        language VARCHAR NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT now()
      );

      -- Indizes auf "key", "country" und "language" setzen
      CREATE INDEX IF NOT EXISTS idx_key ON "${projectId}".translations (key);
      CREATE INDEX IF NOT EXISTS idx_country ON "${projectId}".translations (country);
      CREATE INDEX IF NOT EXISTS idx_language ON "${projectId}".translations (language);

      -- Tabelle "configurations" erstellen
      CREATE TABLE IF NOT EXISTS "${projectId}".configurations (
        id SERIAL PRIMARY KEY,
        locales JSONB NOT NULL,
        "defaultLocale" VARCHAR NOT NULL,
        "projectName" VARCHAR NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT now()
      );
    `;

    await databaseAdapter.query(queryString);

    return { created: true };
  }

  public async update(body: any) : Promise<any> {
     // update not necessary yet! only projectName could be updated.
  }

  public async delete(projectId: string): Promise<any> {
    try {
      await databaseAdapter.query(`DROP SCHEMA IF EXISTS "${projectId}" CASCADE;`);
      return { deleted: true };
    } catch (e) {
      console.log(e);
    }
  }
}
