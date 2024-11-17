export class ValidationService {
    public static validate(body: any, schema: any): string | null {
        const { error } = schema.validate(body);

        if (error) {
            // Log the error details for debugging purposes
            const errorMessage = error.details[0].message;
            const errorValue = error.details[0].context.value;
            console.error(`Failed request validation: ${errorMessage}, value: ${errorValue}`);
            return errorMessage; // Return the validation message
        }

        return null; // No error, validation successful
    }
}
