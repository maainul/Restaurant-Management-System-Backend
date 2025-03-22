export class ValidationError extends Error {
    statusCode: number;
    errors: { field: string, message: string }[]

    constructor(errors: { field: string; message: string }[], statusCode: number = 400) {
        super("Validation Field"); // Call the parent Error class constructor
        this.statusCode = statusCode; // Set the status code for the error
        this.errors = errors
    }
    // toJSON() {
    //     return {
    //         error: this.name,
    //         message: this.message,
    //         statusCode: this.statusCode,
    //         fieldErrors: this.fieldErrors
    //     }
    // }
}
