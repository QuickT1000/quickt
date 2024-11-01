
import { databaseAdapter } from '../adapter/postgres';
import moment from 'moment';
import {TranslationModel} from "@server/models/translation.model";
import {getCountryByLocale, getLanguageByLocale} from "../services/LocalesService";

moment.locale('de');

export class TranslationsRepository {

  client: string;

  constructor(client = 'DW001') {
    this.client = client;
  }

  public async findOne(id: number): Promise<any> {

    let queryString = `
        SELECT key, value, country, language
        FROM "${this.client}".translations
        WHERE id = ${id}
    `;

    const dbResult = await databaseAdapter.query(queryString);

    return dbResult[0];
  }

  public async find(key: string): Promise<any> {
    let queryString = `
        SELECT id, key, value, country, language
        FROM "${this.client}".translations
        WHERE key = '${key}'
    `;

    return await databaseAdapter.query(queryString);
  }

  async create(model: TranslationModel): Promise<any> {
    const result = await databaseAdapter.query(
        `
        INSERT INTO "${this.client}".translations (key, value, language, country)
        VALUES ('${model.key}', '${model.value}', '${model.language}', '${model.country}') RETURNING *
      `
    );
    return result[0];
  }

  async update(model: TranslationModel): Promise<any> {
    const result = await databaseAdapter.query(
        `
    UPDATE
      "${this.client}".translations
    SET 
      value = '${model.value}', 
      key = '${model.key}', 
      updated_at = NOW() 
    WHERE 
      id = ${model.id} 
    RETURNING *  
    `
    );
    return result[0];
  }

  async delete(model: TranslationModel): Promise<any> {
    await databaseAdapter.query(
        `
        DELETE
        FROM "DW001".translations
        WHERE id = ${model.id}
      `
    );
  }

  async deleteByLocale(locale): Promise<any> {
    const country = getCountryByLocale(locale);
    const language = getLanguageByLocale(locale);

    /*await databaseAdapter.query(
        `
        DELETE
        FROM "DW001".translations
        WHERE country = ${country}
        AND language = ${language}
      `
    );*/
  }

  async search(query): Promise<any> {
    let { pageIndex, pageSize, key = '', value = '', country = '', language = '' } = query;

    let queryString = `
      SELECT id, key, value, country, language, Count(*) Over () as total
      FROM "${query.client}".translations
      WHERE key ILIKE '%${key}%'
    `;

    // Case-insensitive Suche auch im value-Feld
    if (value !== '') {
      queryString += ` AND value ILIKE '%${value}%'`
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

      return {
        entries: dbResult,
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


  async bulkInsert(data: Record<string, Record<string, string>>): Promise<any> {
    const queryValues: string[] = [];

    // Über die Schlüssel des Objekts iterieren
    Object.entries(data).forEach(([locale, translations]) => {
      Object.entries(translations).forEach(([translationKey, value]) => {
        // Füge Sprache und Land aus dem Locale ab
        const country = getCountryByLocale(locale);
        const language = getLanguageByLocale(locale);

        // Typüberprüfung für value
        if (typeof value === 'string') {
          // Escape Key und Value für die SQL-Abfrage
          const escapedKey = translationKey.replace(/'/g, "''");
          const escapedValue = value.replace(/'/g, "''");

          queryValues.push(`('${escapedKey}', '${escapedValue}', '${language}', '${country}')`);
        } else {
          console.warn(`Der Wert für den Schlüssel "${translationKey}" ist kein gültiger String.`);
        }
      });
    });

    if (queryValues.length === 0) {
      throw new Error("Keine gültigen Daten zum Einfügen.");
    }

    const query = `
        INSERT INTO "${this.client}".translations (key, value, language, country)
        VALUES ${queryValues.join(', ')}
        RETURNING *;
    `;

    const result = await databaseAdapter.query(query);
    return result;
  }







}
