import * as jwtDecode from 'jwt-decode';

export class Token {
    public email: string;
    public raw: string;

    constructor(email: string, raw: string) {
        this.email = email;
        this.raw = raw;
    }

    public static fromJWT(jwt: string): Token {
        const decoded: { email: string } = jwtDecode(jwt);

        return new Token(decoded.email, jwt);
    }
}
