export class InternalServerErrorException extends Error {
    public statusCode: number;

    constructor(message: string = 'Internal server error') {
        super(message);
        this.statusCode = 500; // Internal Server Error
        Object.setPrototypeOf(this, InternalServerErrorException.prototype);
    }
}
