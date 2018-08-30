import { AuthenticationService } from './services/authentication.service';
import { LoggerService } from './services/logger.service';
import { MessageService } from './services/message.service';

const message: MessageService = new MessageService(document.querySelector('[data-authentication-status]') as HTMLElement);
const actionButton: HTMLElement = document.querySelector('[data-authentication-action]') as HTMLElement;

const logger: LoggerService = new LoggerService(console);
const authenticationService: AuthenticationService = new AuthenticationService(message, logger, actionButton);

authenticationService.init();
