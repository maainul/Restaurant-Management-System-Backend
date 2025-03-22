import { Types } from "mongoose";

interface IReport {
    _id: Types.ObjectId;
    type: "daily" | "weekly" | "monthly";
    generatedAt: Date;
    totalSales: number;
    totalOrders: number;
    topItems: {
        menuItemId: Types.ObjectId;
        quantitySold: number;
    }[];
    revenue: number;
    createdAt: Date;
    updatedAt: Date;
}

export default IReport;
