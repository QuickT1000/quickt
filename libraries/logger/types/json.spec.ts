import log from 'loglevel';
import rTracer from 'cls-rtracer';
import { LogLevel, LogMessage, LoggerFormat, LoggerStore } from '../index';
import { JsonLogger } from './json';

const createError = () => {
    const error = new Error('critical error');
    error.stack =
        'Error: critical error\n' +
        '    at file1 (a.ts)\n' +
        '    at file2 (b.js)';

    return error;
};

describe('JSON Logger', () => {
    let rawMethodMock;

    beforeAll(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date('01 Jan 2000 00:00:00').getTime());
    });

    beforeEach(() => {
        rawMethodMock = jest.fn();
        jest.spyOn(log, 'methodFactory').mockImplementation(jest.fn().mockReturnValue(rawMethodMock));
    });

    afterEach(() => {
        rawMethodMock.mockReset();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should log debug', () => {
        // Given
        const message = 'message';
        const sut = JsonLogger.methodFactory('debug', LogLevel.DEBUG, LoggerFormat.JSON);

        // When
        sut(message);

        // Then
        expect(rawMethodMock).toHaveBeenCalledWith(
            '{"level":"DEBUG","time":"2000-01-01T00:00:00.000Z","message":"message"}'
        );
    });

    it('should log info', () => {
        // Given
        const message = 'message';
        const sut = JsonLogger.methodFactory('info', LogLevel.INFO, LoggerFormat.JSON);

        // When
        sut(message);

        // Then
        expect(rawMethodMock).toHaveBeenCalledWith(
            '{"level":"INFO","time":"2000-01-01T00:00:00.000Z","message":"message"}'
        );
    });

    it('should add trace id info', () => {
        // Given
        const rTracerSpy = jest.spyOn(rTracer, 'id').mockReturnValue('123456');
        const message = 'message';
        const sut = JsonLogger.methodFactory('info', LogLevel.INFO, LoggerFormat.JSON);

        // When
        sut(message);

        // Then
        expect(rawMethodMock).toHaveBeenCalledWith(
            '{"level":"INFO","time":"2000-01-01T00:00:00.000Z","message":"message","traceId":"123456"}'
        );

        rTracerSpy.mockRestore();
    });

    it.each([
        {
            desc: 'error message',
            message: createError(),
            result: '"Error: critical error, at file1 (a.ts), at file2 (b.js)"'
        },
        { desc: 'normal message', message: 'hello world', result: '"hello world"' },
        { desc: 'object message', message: { field1: 'a', field2: 'b' }, result: '{"field1":"a","field2":"b"}' }
    ])('it should log $desc', ({ message, result }) => {
        const sut = JsonLogger.methodFactory('error', LogLevel.ERROR, LoggerFormat.JSON);
        // When
        sut(message);

        // Then
        expect(rawMethodMock).toHaveBeenCalledWith(`{"level":"ERROR","time":"2000-01-01T00:00:00.000Z","message":${result}}`);
    });

    it.each([
        {
            desc: 'error message',
            message: createError(),
            result: '["Error: critical error, at file1 (a.ts), at file2 (b.js)","Error: critical error, at file1 (a.ts), at file2 (b.js)"]'
        },
        { desc: 'normal message', message: 'hello world', result: '["hello world","hello world"]' },
        {
            desc: 'object message',
            message: { field1: 'a', field2: 'b' },
            result: '[{"field1":"a","field2":"b"},{"field1":"a","field2":"b"}]'
        }
    ])('it should log multiple messages $desc', ({ message, result }) => {
        const sut = JsonLogger.methodFactory('error', LogLevel.ERROR, LoggerFormat.JSON);
        // When
        sut(message, message);

        // Then
        expect(rawMethodMock).toHaveBeenCalledWith(`{"level":"ERROR","time":"2000-01-01T00:00:00.000Z","message":${result}}`);
    });

    it.each([
        {
            desc: 'error message',
            message: createError(),
            result: '"Error: critical error, at file1 (a.ts), at file2 (b.js)"'
        },
        { desc: 'normal message', message: 'hello world', result: '"hello world"' },
        { desc: 'object message', message: { field1: 'a', field2: 'b' }, result: '{"field1":"a","field2":"b"}' }
    ])('it should log with meta data store and $desc', ({ message, result }) => {
        const sut = JsonLogger.methodFactory('error', LogLevel.ERROR, LoggerFormat.JSON);
        // When
        LoggerStore.run({
            client: 'C10001',
            order: 'CXC001',
            externalApi: 'externalApiName'
        }, () => {
            sut(message);
        });

        // Then
        expect(rawMethodMock).toHaveBeenCalledWith(`{"level":"ERROR","time":"2000-01-01T00:00:00.000Z","client":"C10001","order":"CXC001","externalApi":"externalApiName","message":${result}}`);
    });

    it.each([
        {
            desc: 'error message',
            message: createError(),
            result: '"Error: critical error, at file1 (a.ts), at file2 (b.js)"'
        },
        { desc: 'normal message', message: 'hello world', result: '"hello world"' },
        { desc: 'object message', message: { field1: 'a', field2: 'b' }, result: '{"field1":"a","field2":"b"}' }
    ])('it should log with meta data store, additional meta data and $desc', ({ message, result }) => {
        // Given
        const msg = new LogMessage(message).metaData({
            custom: 'value'
        });

        const sut = JsonLogger.methodFactory('error', LogLevel.ERROR, LoggerFormat.JSON);

        // When
        LoggerStore.run({
            client: 'C10001',
            order: 'CXC001',
            externalApi: 'externalApiName'
        }, () => {
            sut(msg);
        });

        // Then
        expect(rawMethodMock).toHaveBeenCalledWith(`{"level":"ERROR","time":"2000-01-01T00:00:00.000Z","custom":"value","client":"C10001","order":"CXC001","externalApi":"externalApiName","message":${result}}`);
    });
});
