export class B2cConfig {
    public authenticationEndpoint: string;

    constructor(authenticationEndpoint: string) {
        this.authenticationEndpoint = authenticationEndpoint;
    }

    public static async fromUrl(url: string): Promise<B2cConfig> {
        const response: Response = await fetch(url);

        const json: { authorization_endpoint: string } = await response.json();

        return new B2cConfig(json.authorization_endpoint);
    }
}