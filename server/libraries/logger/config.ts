import { Config } from './models/config.model';
import { isDevelopment, isTest } from './helper';
import { levels } from 'loglevel';
import { LoggerFormat } from './types';
import { LogLevelDesc } from 'loglevel';

export const LoggerConfig: Config = {
    level: process.env['LOG_LEVEL'] as LogLevelDesc || (isDevelopment ? levels.INFO : levels.WARN),
    format: process.env['LOG_FORMAT'] as LoggerFormat || (isDevelopment || isTest ? LoggerFormat.PLAIN : LoggerFormat.JSON)
};
