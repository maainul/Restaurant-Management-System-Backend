import { DailyReportRequestDto } from '../../dto/report/DailyReportRequest.dto';
import { WeeklyReportRequestDto } from '../../dto/report/WeeklyReportRequest.dto';
import { MonthlyReportRequestDto } from '../../dto/report/MonthlyReportRequest.dto';
import { DailyReportResponseDto } from '../../dto/report/DailyReportResponse.dto';
import { WeeklyReportResponseDto } from '../../dto/report/WeeklyReportResponse.dto';
import { MonthlyReportResponseDto } from '../../dto/report/MonthlyReportResponse.dto';

export interface IReportService {
    generateDailyReport(dailyReportDto: DailyReportRequestDto): Promise<DailyReportResponseDto>;
    generateWeeklyReport(weeklyReportDto: WeeklyReportRequestDto): Promise<WeeklyReportResponseDto>;
    generateMonthlyReport(monthlyReportDto: MonthlyReportRequestDto): Promise<MonthlyReportResponseDto>;
}
