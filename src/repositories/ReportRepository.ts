import { IReportRepository } from "../interfaces/report/IReportRepository";

class ReportRepository implements IReportRepository {

    async generateDailyReport(date: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async generateWeeklyReport(startDate: string, endDate: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async generateMonthlyReport(month: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

}

export default ReportRepository