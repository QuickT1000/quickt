import { PgsqlAdapter } from './pgsql.adapter';
import { Logger } from '@libraries/logger';

jest.mock('pg');
jest.mock('../../../../libraries/logger');

describe('PgsqlAdapter', () => {
    let sut: PgsqlAdapter;
    const connectMock = jest.fn();
    const clientMock = {
        query: jest.fn(),
        release: jest.fn()
    };

    const databaseConnectionPoolMock: any = { connect: connectMock };

    beforeEach(() => {
        sut = new PgsqlAdapter(databaseConnectionPoolMock);
        jest.resetAllMocks();
    });

    afterEach(() => {
        connectMock.mockClear();
        clientMock.query.mockClear();
        clientMock.release.mockClear();
    });

    it('should return rows', async () => {
        // Given
        const data = 'select * from database';
        const expected = ['a', 'b'];
        connectMock.mockResolvedValue(clientMock);
        clientMock.query.mockResolvedValue({ rows: expected });

        // When
        const result = await sut.query(data);

        // Then
        expect(result).toBe(expected);
        expect(clientMock.query).toHaveBeenCalledWith(data);
        expect(clientMock.release).toHaveBeenCalled();
    });

    it('should throw error when connection failed', async () => {
        // Given
        const error = 'connection refused';
        connectMock.mockRejectedValue(new Error(error));

        // When
        await expect(() => sut.query('select * from database')).rejects.toThrow(error);

        // Then
        expect(clientMock.release).not.toHaveBeenCalled();
    });

    it('should throw error when query failed', async () => {
        // Given
        const error = 'query invalid';
        connectMock.mockResolvedValue(clientMock);
        clientMock.query.mockRejectedValue(new Error(error));

        // When
        await expect(() => sut.query('select * from invalid_database')).rejects.toThrow(error);

        // Then
        expect(clientMock.release).toHaveBeenCalled();
    });

    it('should log sql statement when it failed', async () => {
        // Given
        const error = 'query invalid';
        connectMock.mockResolvedValue(clientMock);
        clientMock.query.mockRejectedValue(new Error(error));

        // When
        await expect(() => sut.query('select * from invalid_database')).rejects.toThrow(error);

        // Then
        expect(clientMock.release).toHaveBeenCalled();
        expect(Logger.error).toHaveBeenCalledWith(
            'DB Error! query: "select * from invalid_database", ' + 'error: "Error: query invalid"'
        );
    });
});
