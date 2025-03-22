import { Schema, model } from "mongoose";
import ITable from "../../interfaces/table/ITable";

const TableSchema = new Schema<ITable>({
    tableNumber: { type: Number, required: true, unique: true },
    capacity: { type: Number, required: true },
    status: { type: Number, required: true },
}, { timestamps: true });

const Table = model<ITable>("Table", TableSchema);
export default Table;
