
import { databaseAdapter } from '@adapter/postgres';
import moment from 'moment';
import {TranslationModel} from "@models/translation.model";
import {getCountryByLocale, getLanguageByLocale} from "@services/LocalesService";
import {escapeString} from "../utils/utils";

moment.locale('de');

export class TranslationsRepository {

  constructor(private projectId: string) {
    this.projectId = projectId;
  }

  async read(query): Promise<any> {
    let { pageIndex, pageSize, key = '', value = '', country = '', language = '' } = query;

    let queryString = `
      SELECT id, key, value, country, language, Count(*) Over () as total
      FROM "${query.projectId}".translations
      WHERE key ILIKE '%${key}%'
    `;

    if (value !== '') {
      queryString += ` AND value ILIKE '%${escapeString(value)}%'`
    }

    if (country !== '') {
      queryString += ` AND country = '${country}'`
    }

    if (language !== '') {
      queryString += ` AND language = '${language}'`
    }

    queryString += ' ORDER BY updated_at DESC';

    let index = 0;

    if (pageIndex && pageSize) {
      index = parseInt(pageIndex, 0);
      const size = parseInt(pageSize, 0);
      const offset = (index -1) * size;
      queryString = `${queryString} OFFSET ${offset} ROWS FETCH NEXT ${size} ROWS ONLY`;
    }

    try {
      const dbResult = await databaseAdapter.query(queryString);
      const entries = dbResult.map(({ total, ...rest }) => rest);

      return {
        entries: entries,
        pagination: {
          total: Number(dbResult[0].total),
          pageIndex: index,
          pageSize: Number(pageSize),
        }
      };
    } catch (e) {
      return {
        entries: [],
        pagination: {
          total: 0,
          pageIndex: 1,
          pageSize: 5
        }
      }
    }
  }

  public async find(key: string): Promise<any> {
    let queryString = `
        SELECT id, key, value, country, language
        FROM "${this.projectId}".translations
        WHERE key = '${key}'
    `;

    return await databaseAdapter.query(queryString);
  }

  async create(model: TranslationModel): Promise<any> {
    const result = await databaseAdapter.query(
        `
        INSERT INTO "${this.projectId}".translations (key, value, language, country)
        VALUES ('${model.key}', '${escapeString(model.value)}', '${model.language}', '${model.country}') RETURNING *
      `
    );
    return result[0];
  }

  async update(model: TranslationModel): Promise<any> {
    const result = await databaseAdapter.query(
        `
    UPDATE
      "${this.projectId}".translations
    SET 
      value = '${escapeString(model.value)}', 
      key = '${model.key}', 
      updated_at = NOW() 
    WHERE id = ${model.id}
      RETURNING *  
    `
    );
    return result[0];
  }

  async delete(model: TranslationModel): Promise<any> {
    await databaseAdapter.query(
        `
        DELETE
        FROM "${this.projectId}".translations
        WHERE id = ${model.id}
      `
    );
  }

  async deleteByLocale(locale): Promise<any> {
    const country = getCountryByLocale(locale);
    const language = getLanguageByLocale(locale);
    await databaseAdapter.query(
        `
        DELETE
        FROM "${this.projectId}".translations
        WHERE country = '${country}'
        AND language = '${language}'
      `
    );
  }


  async findByProjectNameAndCountryAndLanguage(projectId, country, language): Promise<any> {
    let queryString = `
      SELECT country, Count(*) Over () as total
      FROM "${projectId}".translations
      WHERE country = '${country}'
    `;

    if (language !== '') {
      queryString += ` AND language = '${language}'`
    }

    queryString += ' ORDER BY updated_at DESC';

    try {
      const dbResult = await databaseAdapter.query(queryString);
      return {
        total: Number(dbResult[0].total),
        country: dbResult[0].country
      };
    } catch (e) {
      return {
        total: 0,
        country: ''
      }
    }
  }

  async bulkInsert(data: Record<string, Record<string, string>>): Promise<any> {
    const queryValues: string[] = [];

    Object.entries(data).forEach(([locale, translations]) => {

      Object.entries(translations).forEach(([translationKey, value]) => {
        const country = getCountryByLocale(locale);
        const language = getLanguageByLocale(locale);

        if (typeof value === 'string') {
          queryValues.push(`('${escapeString(translationKey)}', '${escapeString(value)}', '${language}', '${country}')`);
        } else {
          console.warn(`Der Wert für den Schlüssel "${translationKey}" ist kein gültiger String.`);
        }
      });
    });

    if (queryValues.length === 0) {
      throw new Error("Keine gültigen Daten zum Einfügen.");
    }

    console.dir(queryValues, {depth: null, colors: true, maxArrayLength: null});

    const query = `
        INSERT INTO "${this.projectId}".translations (key, value, language, country)
        VALUES ${queryValues.join(', ')}
        RETURNING *;
    `;

    try {
      const result = await databaseAdapter.query(query);
      return result;
    } catch (e) {
      console.log(e);
      return 'database error while bulkimport'
    }

  }
}
