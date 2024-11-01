import log, { Logger } from 'loglevel';
import format from 'date-format';
import { LoggerConfig } from '../config';
import { LoggerFormat } from './index';
import rTracer from 'cls-rtracer';
import { LogMessage } from '../logger';
import { getLoggerMetaData } from '../logger-store';

const JsonLogger: Logger = log.getLogger(LoggerFormat.JSON);

const buildError = (err =>
    err.stack.toString()
        .split('\n')
        .map(line => line.trimStart())
        .join(', '));

const buildMessage = (message) => {
    if (message instanceof Error) {
        return buildError(message);
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

JsonLogger.methodFactory = (methodName: string, logLevel, loggerName) => {
    const rawMethod = log.methodFactory(methodName, logLevel, loggerName);

    return (...messages) => {
        let logMessage;
        let metaData = {};

        if (messages.length <= 1) {
            const message = messages[0];
            ({ logMessage, metaData } = getMessage(message));
        } else {
            const logMessages = messages.map(getMessage);
            logMessage = logMessages.map(m => m.logMessage);
            metaData = logMessages[0].metaData;
        }

        const time = format.asString('yyyy-MM-ddThh:mm:ss.SSSZ', new Date());
        const data = {
            level: methodName.toUpperCase(),
            time: time,
            ...metaData,
            message: logMessage,
            traceId: rTracer.id()
        };

        rawMethod(JSON.stringify(data));
    };
};

JsonLogger.setLevel(LoggerConfig.level, false);

export { JsonLogger };
