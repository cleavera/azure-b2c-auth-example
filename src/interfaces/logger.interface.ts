export interface ILogger {
    log(...args: Array<unknown>): void;
    error(error: Error): void;
}
