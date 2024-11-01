import { LogLevelDesc } from 'loglevel';
import { LoggerFormat } from '../types';

export interface Config {
    level?: LogLevelDesc,
    format?: LoggerFormat
}