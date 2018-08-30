import { B2cConfig } from '../classes/b2c-config';
import { Token } from '../classes/token';
import { CONFIG_ENDPOINT } from '../constants/azure.constant';

import { RequiresAuthError } from '../errors/requires-auth.error';

export class AzureB2cService {
    public static async getConfig(): Promise<B2cConfig> {
        return await B2cConfig.fromUrl(CONFIG_ENDPOINT);
    }

    public static parseHash(hash: string): Token {
        if (!hash) {
            throw new RequiresAuthError();
        }

        const jwt: string = hash.replace(/#/, '').replace(/id_token=(.+)/, '$1');

        if (jwt) {
            return Token.fromJWT(jwt);
        } else {
            throw new RequiresAuthError();
        }
    }
}
