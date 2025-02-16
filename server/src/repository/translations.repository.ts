import {databaseAdapter} from '@adapter/postgres';
import moment from 'moment';
import {TranslationModel} from "@models/translation.model";
import {getCountryByLocale, getLanguageByLocale} from "@services/LocalesService";
import {buildFilterQuery, escapeString} from "../utils/utils";

moment.locale('de');

export class TranslationsRepository {

    constructor(private projectId: string = '') {
        this.projectId = projectId;
    }

    async read(body): Promise<any> {
        let { page = 0, rows = 5, filters } = body;

        let queryString = `
            SELECT id, key, value, country, language, Count(*) Over () as total
            FROM "${this.projectId}".translations
        `;

        queryString += buildFilterQuery(filters);
        queryString += ' ORDER BY updated_at DESC';

        if (typeof page !== 'undefined') {
            const offset = page * rows;
            queryString += ` OFFSET ${offset} ROWS FETCH NEXT ${rows} ROWS ONLY`;
        }

        try {
            const dbResult = await databaseAdapter.query(queryString);
            const entries = dbResult.map(({ total, ...rest }) => rest);

            return {
                entries,
                filter: {
                    ...body,
                    total: Number(dbResult[0]?.total || 0),
                    page,
                    rows,
                },
            };
        } catch (e) {
            return {
                entries: [],
                filter: { ...body, total: 0, page: 1, rows: 5 }
            };
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
                SET value      = '${escapeString(model.value)}',
                    key        = '${model.key}',
                    updated_at = NOW()
                WHERE id = ${model.id} RETURNING *
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

        const query = `
            INSERT INTO "${this.projectId}".translations (key, value, language, country)
            VALUES ${queryValues.join(', ')} RETURNING *;
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
