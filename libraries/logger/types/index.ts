import { JsonLogger } from './json';
import { PlainLogger } from './plain';

export const enum LoggerFormat {
    JSON = 'json',
    PLAIN = 'plain',
}

export const LoggerTypes = {
    [LoggerFormat.JSON]: JsonLogger,
    [LoggerFormat.PLAIN]: PlainLogger,
};
