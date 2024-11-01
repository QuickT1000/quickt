import { AsyncLocalStorage } from 'async_hooks';

export const LoggerStore = new AsyncLocalStorage();

export const getLoggerMetaData = (): any => LoggerStore.getStore();
