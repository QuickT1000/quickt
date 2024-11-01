/**
 * get env variable by name
 * @param {string} key - env variable name
 * @throws {Error} will throw an error if env is not defined
 */
export const getRequiredEnv = (key: string): string => {
    const value = process.env[key];

    if (!value) {
        throw new Error(`${key} is not defined`);
    }

    return value;
};

/**
 *  get env variable by name
 *  @param {string} key - env variable name
 */
export const getOptionalEnv = (key: string): string => process.env[key] || '';
