import { databaseAdapter } from '../adapter/postgres';

export class ConfigurationsRepository {

  public async read(projectId: string, query?: any): Promise<any> {
    let queryString = `SELECT * FROM "${projectId}".configurations`;
    const dbResult = await databaseAdapter.query(queryString);
    return dbResult[0];
  }

  async create(body: any): Promise<any> {
    const locales = JSON.stringify(body.locales);

    try {
      const sql = `
            INSERT INTO "${body.projectId}".configurations (locales, "defaultLocale", "projectName")
            VALUES ('${locales}', '${body.defaultLocale}', '${body.projectName}') RETURNING *
        `;
      const result = await databaseAdapter.query(sql);

      return result[0];
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  }

  async update(body: any): Promise<any> {
    const locales = JSON.stringify(body.locales);
    const result = await databaseAdapter.query(
        `
    UPDATE
      "${body.projectId}".configurations
    SET 
      locales = '${locales}', 
      "defaultLocale" = '${body.defaultLocale}', 
      "projectName" = '${body.projectName}', 
      updated_at = NOW() 
    WHERE id = 1
      RETURNING *  
    `
    );
    return result[0];
  }


}
