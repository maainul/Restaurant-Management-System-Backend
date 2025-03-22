// import { DailyReportRequestDto } from "../dto/report/DailyReportRequest.dto";
// import { DailyReportResponseDto } from "../dto/report/DailyReportResponse.dto";
// import { MonthlyReportRequestDto } from "../dto/report/MonthlyReportRequest.dto";
// import { MonthlyReportResponseDto } from "../dto/report/MonthlyReportResponse.dto";
// import { WeeklyReportRequestDto } from "../dto/report/WeeklyReportRequest.dto";
// import { WeeklyReportResponseDto } from "../dto/report/WeeklyReportResponse.dto";
// import { IReportService } from "../interfaces/report/IReportService";
// import { IReportRepository } from "../interfaces/report/IReportRepository"; // Assuming you have a repository for report-related DB queries

// class ReportService implements IReportService {
//     private reportRepository: IReportRepository; // Report repository for fetching data

//     constructor(reportRepository: IReportRepository) {
//         this.reportRepository = reportRepository;
//     }

//     // Generate Daily Report
//     async generateDailyReport(dailyReportDto: DailyReportRequestDto): Promise<DailyReportResponseDto> {
//         console.log("ReportService: generateDailyReport called");

//         // Fetch data for the daily report
//         const reportData = await this.reportRepository.getDailyReportData(dailyReportDto);

//         // Process and return the report data as DailyReportResponseDto
//         return {
//             date: dailyReportDto.date,
//             totalSales: reportData.totalSales,
//             totalOrders: reportData.totalOrders,
//             totalCustomers: reportData.totalCustomers,
//             // Other fields as per the report data
//         };
//     }

//     // Generate Weekly Report
//     async generateWeeklyReport(weeklyReportDto: WeeklyReportRequestDto): Promise<WeeklyReportResponseDto> {
//         console.log("ReportService: generateWeeklyReport called");

//         // Fetch data for the weekly report
//         const reportData = await this.reportRepository.generateWeeklyReport(weeklyReportDto);

//         // Process and return the report data as WeeklyReportResponseDto
//         return {
//             weekStart: weeklyReportDto.weekStart,
//             weekEnd: weeklyReportDto.weekEnd,
//             totalSales: reportData.totalSales,
//             totalOrders: reportData.totalOrders,
//             totalCustomers: reportData.totalCustomers,
//             // Other fields as per the report data
//         };
//     }

//     // Generate Monthly Report
//     async generateMonthlyReport(monthlyReportDto: MonthlyReportRequestDto): Promise<MonthlyReportResponseDto> {
//         console.log("ReportService: generateMonthlyReport called");

//         // Fetch data for the monthly report
//         const reportData = await this.reportRepository.getMonthlyReportData(monthlyReportDto);

//         // Process and return the report data as MonthlyReportResponseDto
//         return {
//             month: monthlyReportDto.month,
//             totalSales: reportData.totalSales,
//             totalOrders: reportData.totalOrders,
//             totalCustomers: reportData.totalCustomers,
//             // Other fields as per the report data
//         };
//     }
// }

// export default ReportService;
