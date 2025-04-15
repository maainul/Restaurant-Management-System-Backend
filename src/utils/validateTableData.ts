
import CreateTableRequestDto from "../dto/table/CreateTableRequest.dto";
import UpdateTableRequestDto from "../dto/table/UpdateTableRequest.dto";
import { ValidationError } from "../errors/errors";

const validateTableData = (data: CreateTableRequestDto | UpdateTableRequestDto): void => {
    const errors: { field: string; message: string }[] = [];


    if (!data.capacity) {
        errors.push({ field: "capacity", message: "capacity number is required" });
    } else if (typeof data.capacity !== "number") {
        errors.push({ field: "capacity", message: "capacity Name must be number" });
    } else if (data.capacity < 0) {
        errors.push({ field: "capacity", message: "capacity Name must be at least 1" });
    }
    if (!data.number) {
        errors.push({ field: "number", message: "number  is required" });
    } else if (typeof data.capacity !== "string") {
        errors.push({ field: "number", message: "number  must be number" });
    }

    if (!data.status) {
        errors.push({ field: "status", message: "status  is required" });
    }

    if (errors.length > 0) {
        throw new ValidationError(errors, 400);
    }
};

export default validateTableData