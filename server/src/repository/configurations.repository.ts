import { databaseAdapter } from '../adapter/postgres';

export class ConfigurationsRepository {

  public async read(projectName: string): Promise<any> {
    const dbResult = await databaseAdapter.query(`SELECT * FROM "${projectName}".configurations`);
    return dbResult[0];
  }

  async create(body: any): Promise<any> {
    const locales = JSON.stringify(body.locales);

    try {
      const sql = `
            INSERT INTO "${body.projectName}".configurations (locales, "defaultLocale")
            VALUES ('${locales}', '${body.defaultLocale}') RETURNING *
        `;
      const result = await databaseAdapter.query(sql);

      return result[0];
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  }

  async update(body): Promise<any> {
    const locales = JSON.stringify(body.locales);
    const result = await databaseAdapter.query(
        `
    UPDATE
      "${body.projectName}".configurations
    SET 
      locales = '${locales}', 
      "defaultLocale" = '${body.defaultLocale}', 
      updated_at = NOW() 
    WHERE id = 1
      RETURNING *  
    `
    );
    return result[0];
  }


}
