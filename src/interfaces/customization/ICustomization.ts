import { Types } from "mongoose";

interface ICustomization {
    _id: Types.ObjectId;
    name: string;
    options: string[];
    createdAt: Date;
    updatedAt: Date;
}
export default ICustomization