import { Schema, model } from "mongoose";
import IReport from "../../interfaces/report/IReport";

const ReportSchema = new Schema<IReport>({
    type: { type: String, enum: ["daily", "weekly", "monthly"], required: true },
    generatedAt: { type: Date, default: Date.now },
    totalSales: { type: Number, required: true },
    totalOrders: { type: Number, required: true },
    topItems: [
        {
            menuItemId: { type: Schema.Types.ObjectId, ref: "MenuItem", required: true },
            quantitySold: { type: Number, required: true }
        }
    ],
    revenue: { type: Number, required: true }
}, { timestamps: true });

const Report = model<IReport>("Report", ReportSchema);
export default Report;
