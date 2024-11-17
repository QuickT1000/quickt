export class UnauthorizedException extends Error {
    public statusCode: number;

    constructor(message: string = 'Unauthorized access') {
        super(message);
        this.statusCode = 401; // Unauthorized
        Object.setPrototypeOf(this, UnauthorizedException.prototype);
    }
}
