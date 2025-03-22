import { ValidationError } from "./errors";

class ConflictError extends ValidationError {
    constructor(message: string, statusCode: number = 409) {
        super([{ field: "name", message }], statusCode);
    }
}

export default ConflictError