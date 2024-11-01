import { Logger, LogLevel } from './logger';
import { LoggerConfig } from './config';
import { LoggerFormat } from './types';

describe('Logger', () => {
    let consoleLogSpy, consoleInfoSpy, consoleWarnSpy, consoleErrorSpy;

    beforeEach(() => {
        Logger.setLevel(LogLevel.TRACE);
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
        consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation();
        consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
        consoleLogSpy.mockClear();
        consoleInfoSpy.mockClear();
        consoleWarnSpy.mockClear();
        consoleErrorSpy.mockClear();
    });

    afterAll(() => {
        consoleLogSpy.mockRestore();
        consoleInfoSpy.mockRestore();
        consoleWarnSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });

    describe('Format', () => {
        it('should use default format', () => {
            // When
            // default value is used

            // Then
            expect(LoggerConfig.format).toEqual(LoggerFormat.PLAIN);
        });

        it('should update LoggerConfig if setFormat is called', () => {
            // Given
            const format = LoggerFormat.PLAIN;

            // When
            Logger.setFormat(format);

            // Then
            expect(LoggerConfig.format).toEqual(format);
        });

        it('should write log when current level includes messages', () => {
            // Given
            Logger.setLevel(LogLevel.INFO);

            // When
            Logger.info('message');

            // Then
            expect(consoleInfoSpy).toHaveBeenCalled();
        });

        it('should not write log when current level excludes message', () => {
            // Given
            Logger.setLevel(LogLevel.WARN);

            // When
            Logger.info('message');

            // Then
            expect(consoleInfoSpy).not.toHaveBeenCalled();
        });

        it('should call trace', () => {
            // When
            Logger.trace('message');

            // Then
            expect(consoleErrorSpy).toHaveBeenCalled();
        });

        it('should call debug', () => {
            // When
            Logger.debug('message');

            // Then
            expect(consoleLogSpy).toHaveBeenCalled();
        });

        it('should call warn', () => {
            // When
            Logger.warn('message');

            // Then
            expect(consoleWarnSpy).toHaveBeenCalled();
        });

        it('should call error', () => {
            // When
            Logger.error('message');

            // Then
            expect(consoleErrorSpy).toHaveBeenCalled();
        });
    });
});
