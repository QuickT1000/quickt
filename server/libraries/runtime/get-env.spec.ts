import { getOptionalEnv, getRequiredEnv } from './get-env';

describe('Env Util Functions', () => {
    it('should throw an error when the requested env var does not exist', () => {
        // Given
        const envKey = 'ENV_KEY';
        delete process.env[envKey];

        // When
        const invocation = () => getRequiredEnv(envKey);

        // Then
        expect(invocation).toThrow();
    });

    it('should throw an error when the requested env var is empty', () => {
        // Given
        const envKey = '';
        process.env[envKey] = '';

        // When
        const invocation = () => getRequiredEnv(envKey);

        // Then
        expect(invocation).toThrow();
    });

    it('should return the env value when the value exists and is not empty', () => {
        // Given
        const envKey = 'ENV_KEY';
        const envValue = 'value';
        process.env[envKey] = envValue;

        // When
        const actual = getRequiredEnv(envKey);

        // Then
        expect(actual).toBe(envValue);
    });

    it('should return the actual env value when the value exists', () => {
        // Given
        const envKey = 'ENV_KEY';
        const envValue = 'value';
        process.env[envKey] = envValue;

        // When
        const actual = getOptionalEnv(envKey);

        // Then
        expect(actual).toBe(envValue);
    });

    it('should return the an empty string when the value does not exist', () => {
        // Given
        const envKey = 'ENV_KEY';
        delete process.env[envKey];

        // When
        const actual = getOptionalEnv(envKey);

        // Then
        expect(actual).toBe('');
    });
});