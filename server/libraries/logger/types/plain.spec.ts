import log from 'loglevel';
import rTracer from 'cls-rtracer';
import { PlainLogger } from './plain';
import { LogLevel, LogMessage, LoggerFormat, LoggerStore } from '../index';

jest.mock('chalk', () => ({
    reset: a => a,
    cyan: a => a,
    yellow: a => a,
    red: a => a,
    blue: a => a,
    green: a => a
}));

const createError = () => {
    const error = new Error('critical error');
    error.stack =
        'Error: critical error\n' +
        '    at file1 (a.ts)\n' +
        '    at file2 (b.js)';

    return error;
};

describe('Plain Logger', () => {
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
        const sut = PlainLogger.methodFactory('debug', LogLevel.DEBUG, LoggerFormat.PLAIN);

        // When
        sut(message);

        // Then
        expect(rawMethodMock).toHaveBeenCalledWith('2000-01-01 00:00:00 [DEBUG] message');
    });

    it('should log info', () => {
        // Given
        const message = 'message';
        const sut = PlainLogger.methodFactory('info', LogLevel.INFO, LoggerFormat.PLAIN);

        // When
        sut(message);

        // Then
        expect(rawMethodMock).toHaveBeenCalledWith('2000-01-01 00:00:00 [INFO] message');
    });

    it('should add trace id info', () => {
        // Given
        const rTracerSpy = jest.spyOn(rTracer, 'id').mockReturnValue('123456');
        const message = 'message';
        const sut = PlainLogger.methodFactory('info', LogLevel.INFO, LoggerFormat.PLAIN);

        // When
        sut(message);

        // Then
        expect(rawMethodMock).toHaveBeenCalledWith('2000-01-01 00:00:00 [INFO] [Trace-ID: 123456] message');

        rTracerSpy.mockRestore();
    });

    test.each([
        {
            desc: 'error message',
            message: createError(),
            result: 'Error: critical error, at file1 (a.ts), at file2 (b.js)'
        },
        { desc: 'normal message', message: 'hello world', result: 'hello world' },
        { desc: 'object message', message: { field1: 'a', field2: 'b' }, result: '{"field1":"a","field2":"b"}' }
    ])('it should log $desc', ({ message, result }) => {
        const sut = PlainLogger.methodFactory('error', LogLevel.ERROR, LoggerFormat.PLAIN);
        // When
        sut(message);

        // Then
        expect(rawMethodMock).toHaveBeenCalledWith(`2000-01-01 00:00:00 [ERROR] ${result}`);
    });

    test.each([
        {
            desc: 'error message',
            message: createError(),
            result: 'Error: critical error, at file1 (a.ts), at file2 (b.js), Error: critical error, at file1 (a.ts), at file2 (b.js)'
        },
        { desc: 'normal message', message: 'hello world', result: 'hello world, hello world' },
        {
            desc: 'object message',
            message: { field1: 'a', field2: 'b' },
            result: '{"field1":"a","field2":"b"}, {"field1":"a","field2":"b"}'
        }
    ])('it should log multiple messages $desc', ({ message, result }) => {
        const sut = PlainLogger.methodFactory('error', LogLevel.ERROR, LoggerFormat.PLAIN);
        // When
        sut(message, message);

        // Then
        expect(rawMethodMock).toHaveBeenCalledWith(`2000-01-01 00:00:00 [ERROR] ${result}`);
    });

    test.each([
        {
            desc: 'error message',
            message: createError(),
            result: 'Error: critical error, at file1 (a.ts), at file2 (b.js)'
        },
        { desc: 'normal message', message: 'hello world', result: 'hello world' },
        { desc: 'object message', message: { field1: 'a', field2: 'b' }, result: '{"field1":"a","field2":"b"}' }
    ])('it should log with meta data store and $desc', ({ message, result }) => {
        const sut = PlainLogger.methodFactory('error', LogLevel.ERROR, LoggerFormat.PLAIN);
        // When
        LoggerStore.run({
            client: 'C10001',
            order: 'CXC001',
            externalApi: 'externalApiName'
        }, () => {
            sut(message);
        });

        // Then
        expect(rawMethodMock).toHaveBeenCalledWith(`2000-01-01 00:00:00 [ERROR] [Client: C10001 | Order: CXC001 | ExternalApi: externalApiName] ${result}`);
    });

    test.each([
        {
            desc: 'error message',
            message: createError(),
            result: 'Error: critical error, at file1 (a.ts), at file2 (b.js)'
        },
        { desc: 'normal message', message: 'hello world', result: 'hello world' },
        { desc: 'object message', message: { field1: 'a', field2: 'b' }, result: '{"field1":"a","field2":"b"}' }
    ])('it should log with meta data store, additional meta data and $desc', ({ message, result }) => {
        // Given
        const msg = new LogMessage(message).metaData({
            custom: 'value'
        });

        const sut = PlainLogger.methodFactory('error', LogLevel.ERROR, LoggerFormat.PLAIN);

        // When
        LoggerStore.run({
            client: 'C10001',
            order: 'CXC001',
            externalApi: 'externalApiName'
        }, () => {
            sut(msg);
        });

        // Then
        expect(rawMethodMock).toHaveBeenCalledWith(`2000-01-01 00:00:00 [ERROR] [Custom: value | Client: C10001 | Order: CXC001 | ExternalApi: externalApiName] ${result}`);
    });
});
