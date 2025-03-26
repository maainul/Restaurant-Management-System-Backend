import mongoose from "mongoose";
import { ValidationError } from "../errors/errors";


const validateObjectId = (id: string) => {
    if (id === undefined) {
        throw new ValidationError([{ field: "id", message: "Id is Requried" }], 400);
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ValidationError([{ field: "id", message: "Invalid ID format" }], 400);
    }
};

export default validateObjectId;
