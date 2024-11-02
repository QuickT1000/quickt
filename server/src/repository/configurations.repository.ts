import { databaseAdapter } from '../adapter/postgres';

export class ConfigurationsRepository {

  public async findOne(model: any): Promise<any> {

    let queryString = `
        SELECT "${model.type}"
        FROM "${model.client}".configurations
    `;

    const dbResult = await databaseAdapter.query(queryString);

    return dbResult[0];
  }

  async create(query): Promise<any> {
    const value = JSON.stringify({ locales: query.locales });

    try {
      const sql = `
            INSERT INTO "${query.projectName}".configurations (client_config)
            VALUES ('${value}') RETURNING *
        `;
      const result = await databaseAdapter.query(sql); // Hier nur 1 Argument
      return result[0];
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  }

  async update(body): Promise<any> {

  }


}
