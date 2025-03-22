import { ValidationError } from "./errors";

class DatabaseError extends ValidationError {
    constructor(message: string, statusCode: number = 500) {
        super([{ field: "database", message }], statusCode);
    }
}

export default DatabaseError