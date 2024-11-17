export class ConflictException extends Error {
    public statusCode: number;

    constructor(message: string = 'Conflict detected') {
        super(message);
        this.statusCode = 409; // Conflict
        Object.setPrototypeOf(this, ConflictException.prototype);
    }
}
