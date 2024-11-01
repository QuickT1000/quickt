import log, { Logger, LogLevelNumbers } from 'loglevel';
import format from 'date-format';
import { LoggerConfig } from '../config';
import { LoggerFormat } from './index';
import chalk from 'chalk';
import rTracer from 'cls-rtracer';
import { LogMessage } from '../logger';
import { getLoggerMetaData } from '../logger-store';

const PlainLogger: Logger = log.getLogger(LoggerFormat.PLAIN);

const TerminalColor = {
    TRACE: chalk.reset,
    DEBUG: chalk.reset,
    INFO: chalk.cyan,
    WARN: chalk.yellow,
    ERROR: chalk.red
};

const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

const buildError = (err =>
    err.stack.toString()
        .split('\n')
        .map(line => line.trimStart())
        .join(', '));

const buildMessage = (message) => {
    if (message instanceof Error) {
        return buildError(message);
    } else if (typeof message === 'object') {
        return JSON.stringify(message);
    } else {
        return message;
    }
}

const getMessage = (message => {
    let logMessage: any = '';
    let meta: {};
    let metaData = getLoggerMetaData() || {};

    if (message instanceof LogMessage) {
        logMessage = buildMessage(message.msg);
        meta = message.meta;
    } else {
        logMessage = buildMessage(message);
    }

    return {
        metaData: { ...meta, ...metaData },
        logMessage
    };
});

PlainLogger.methodFactory = (methodName: string, logLevel: LogLevelNumbers, loggerName: string) => {
    const rawMethod = log.methodFactory(methodName, logLevel, loggerName);
    const levelName = methodName.toUpperCase();

    let coloredMethodName = TerminalColor[levelName](levelName);

    return (...messages) => {
        let logMessage: string;
        let metaData = {};

        if (messages.length <= 1) {
            const message = messages[0];
            ({ logMessage, metaData } = getMessage(message));
        } else {
            const logMessages = messages.map(getMessage);
            logMessage = logMessages.map(m => m.logMessage).join(', ');
            metaData = logMessages[0].metaData;
        }

        const metaFields = Object.keys(metaData).map((field) => {
            return `${capitalizeFirstLetter(field)}: ${chalk.green(metaData[field])}`;
        }).join(' | ');

        const metaFieldsStr = metaFields.length > 0 ? `[${metaFields}] ` : '';

        const time = format.asString('yyyy-MM-dd hh:mm:ss', new Date());
        let traceId = rTracer.id() ? `[Trace-ID: ${rTracer.id()}] ` : '';
        rawMethod(`${time} [${coloredMethodName}] ${traceId}${metaFieldsStr}${logMessage}`);
    };
};

PlainLogger.setLevel(LoggerConfig.level, false);

export { PlainLogger };
