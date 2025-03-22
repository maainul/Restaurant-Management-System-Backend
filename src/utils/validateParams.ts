import { ValidationError } from "../errors/errors";

const validateParams = (params: Record<string, any>, requiredFields: string[]) => {
    const errors: { field: string; message: string }[] = [];

    requiredFields.forEach((field) => {
        if (!params[field]) {
            errors.push({
                field: field,
                message: `${field} is required`,
            });
        }
    });

    if (errors.length > 0) {
        throw new ValidationError(errors, 400);
    }
};

export default validateParams;
