export class ForbiddenException extends Error {
    public statusCode: number;

    constructor(message: string = 'Access forbidden') {
        super(message);
        this.statusCode = 403; // Forbidden
        Object.setPrototypeOf(this, ForbiddenException.prototype);
    }
}
