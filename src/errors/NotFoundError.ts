import { ValidationError } from "./errors";

class NotFoundError extends ValidationError {
    constructor(message: string, statusCode: number = 404) {
        super([{ field: "id", message }], statusCode);
    }
}

export default NotFoundError