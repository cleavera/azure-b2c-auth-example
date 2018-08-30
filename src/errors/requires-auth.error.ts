export class RequiresAuthError extends Error {
    constructor() {
        super('Requires authentication');
    }
}
