import mongoose from "mongoose";
import { ValidationError } from "../errors/errors";


const validateObjectId = (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ValidationError([{ field: "id", message: "Invalid ID format" }], 400);
    }
};

export default validateObjectId;
