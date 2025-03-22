export interface IReportRepository {
    getDailyReportData(date: string): Promise<any>;
    generateWeeklyReport(startDate: string, endDate: string): Promise<any>;
    generateMonthlyReport(month: string): Promise<any>;
}
