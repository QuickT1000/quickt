export class BadRequestException extends Error {
    public statusCode: number;

    constructor(message: string) {
        super(message);
        this.statusCode = 400; // BadRequest status code
        this.name = this.constructor.name; // Set the exception name (optional)
        Object.setPrototypeOf(this, BadRequestException.prototype);
    }
}
