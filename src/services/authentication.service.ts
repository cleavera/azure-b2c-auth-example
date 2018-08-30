import { B2cConfig } from '../classes/b2c-config';
import { Token } from '../classes/token';
import { CLIENT_ID, REDIRECT_URL } from '../constants/azure.local';
import { StorageKeys } from '../constants/storage-keys.constant';
import { ActionService } from './action.service';
import { AzureB2cService } from './azure-b2c.service';
import { LoggerService } from './logger.service';
import { MessageService } from './message.service';
import { StorageService } from './storage.service';

export class AuthenticationService {
    public token: Token;
    public config: B2cConfig;
    private _storage: StorageService;
    private _messenger: MessageService;
    private _logger: LoggerService;
    private _actionElement: HTMLElement;
    private _actionService: ActionService;

    constructor(storage: StorageService, messenger: MessageService, logger: LoggerService, actionElement: HTMLElement) {
        this._storage = storage;
        this._messenger = messenger;
        this._logger = logger;
        this._actionElement = actionElement;
        this._actionService = ActionService.elementTrigger(actionElement);
    }

    public async init(): Promise<void> {
        this.config = await AzureB2cService.getConfig();

        if (this._storage.has(StorageKeys.TOKEN)) {
            this.token = Token.fromJWT(this._storage.get<string>(StorageKeys.TOKEN) as string);
        } else {
            try {
                this._updateToken(window.location.hash);
            } catch (e) {
                this._logger.log(e);
                this._messenger.set('Unauthenticated');
                this._actionElement.innerText = 'Authenticate';
                this._actionService.setAction((): void => {
                    this.authenticate();
                });

                return;
            }
        }

        this._messenger.set('Authenticated');
        this._actionElement.innerText = 'Refresh token';
        this._actionService.setAction((): void => {
            this.refreshToken();
        });
    }

    public authenticate(): void {
        window.location.href = `${this.config.authenticationEndpoint}&nonce=defaultNonce&scope=openid&response_type=id_token&prompt=login&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}`;
    }

    public refreshToken(): void {
        this._messenger.set('Refreshing');
        const iFrame: HTMLIFrameElement = document.createElement('iframe');
        iFrame.src = `${this.config.authenticationEndpoint}&scope=openid&response_type=id_token&prompt=none&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}`;
        iFrame.style.display = 'none';

        iFrame.addEventListener('load', () => {
            try {
                this._updateToken((iFrame.contentWindow as Window).location.hash);

                this._messenger.set(`Refreshed token: ${this.token.raw}`);
            } catch (e) {
                this._logger.error(e);
                this._messenger.set(`Token refresh failed`);
            }

            document.body.removeChild(iFrame);
        });

        document.body.appendChild(iFrame);
    }

    private _updateToken(hash: string): void {
        this.token = AzureB2cService.parseHash(hash);
        this._storage.set(StorageKeys.TOKEN, this.token.raw);
    }
}
