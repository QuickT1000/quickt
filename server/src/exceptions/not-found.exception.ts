export class NotFoundException extends Error {
    public statusCode: number;

    constructor(message: string) {
        super(message);
        this.statusCode = 404; // Not Found status code
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, NotFoundException.prototype);
    }
}

