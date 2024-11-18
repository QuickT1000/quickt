
import { databaseAdapter } from '@adapter/postgres';
import moment from 'moment';

moment.locale('de');

export class L10nRepository {

  constructor(private projectId: string) {
    this.projectId = projectId;
  }

  async read(query: any): Promise<any> {
    let { country = '', language = '' } = query;

    let queryString = `
      SELECT key, value
      FROM "${this.projectId}".translations
      WHERE country = '${country}'
      AND language = '${language}'
    `;

    try {
      return await databaseAdapter.query(queryString);
    } catch (e) {
      console.log('error', e)
    }
  }
}
