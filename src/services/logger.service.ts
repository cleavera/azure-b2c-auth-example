import { ILogger } from '../interfaces/logger.interface';

export class LoggerService {
    private _logger: ILogger;

    constructor(logger: ILogger) {
        this._logger = logger;
    }

    public log(...args: Array<unknown>): void {
        this._logger.log(...args);
    }

    public error(error: Error): void {
        this._logger.error(error);
    }
}
