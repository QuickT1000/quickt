import log, { levels, LogLevelDesc } from 'loglevel';
import { LoggerFormat, LoggerTypes } from './types';
import { LoggerConfig } from './config';

const getLogger = (): log.Logger => LoggerTypes[LoggerConfig.format];

export class LogMessage {
    public meta = {};
    constructor(public msg: any) {
    }

    metaData(meta: any) {
        this.meta = meta;
        return this;
    }
}

export const Logger = {
    setFormat: (format: LoggerFormat): void => {
        LoggerConfig.format = format;
    },
    setLevel: (level: LogLevelDesc): void => getLogger().setLevel(level, false),
    trace: (...msg): void => getLogger().trace(...msg),
    debug: (...msg): void => getLogger().debug(...msg),
    info: (...msg): void => getLogger().info(...msg),
    warn: (...msg): void => getLogger().warn(...msg),
    error: (...msg): void => getLogger().error(...msg)
};

export { levels as LogLevel };
