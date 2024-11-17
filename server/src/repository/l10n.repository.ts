
import { databaseAdapter } from '@adapter/postgres';
import moment from 'moment';

moment.locale('de');

export class L10nRepository {

  constructor(private projectName: string) {
    this.projectName = projectName;
  }

  async read(query: any): Promise<any> {
    let { country = '', language = '' } = query;

    let queryString = `
      SELECT key, value
      FROM "${this.projectName}".translations
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
