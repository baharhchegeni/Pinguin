import { Injectable } from "@angular/core";
import { BehaviorSubject, filter, map, Observable } from "rxjs";
import { IGanttChartRow, MonthAxis } from "../model/chart.model";
import { ApiService } from "./api/api.service";
import { DateHelperService } from "../../utils/date-helper.service";
import { IssuesResponse } from "./api/Issue.adapter";

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  static calculateTotalDaysOfAllMonths(startDate: Date, endDate: Date): number {
    var totalDaysOfAllMonths: number = 0;
    const startMonth = startDate.getMonth();
    const endMonth = endDate.getMonth();
    for (var i = 0; i <= endMonth - startMonth; i++) {
      const adjustedStartDate = DateHelperService.addMonths(startDate, i);
      const daysInMonth = DateHelperService.daysInMonth(adjustedStartDate);
      totalDaysOfAllMonths = totalDaysOfAllMonths + daysInMonth;
    }

    return totalDaysOfAllMonths;
  }

  /** Given a start and end date will return full months between period along with month names and 
* relative duration percentages for each month
*/
  static getMonths(startDate: Date, endDate: Date): MonthAxis[] {
    const startMonth = startDate.getMonth();
    const endMonth = endDate.getMonth();
    const totalDurationDays = DateHelperService.dateDifference(startDate, endDate, true);
    let months: MonthAxis[] = new Array();
    for (var i = 0; i <= endMonth - startMonth; i++) {
      const adjustedStartDate = DateHelperService.addMonths(startDate, i);
      const monthName = DateHelperService.getMonthName(adjustedStartDate);
      const daysInMonth = DateHelperService.daysInMonth(adjustedStartDate);
      const monthDurationPercentage = daysInMonth / totalDurationDays * 100;
      months.push({ monthName: monthName, monthDurationPercentage: monthDurationPercentage });
    }

    months = months.map(x => {
      const month: MonthAxis = {
        monthName: DateHelperService.getMonthNameBasedOnDate(new Date(x.monthName)),
        monthDurationPercentage: x.monthDurationPercentage
      };
      return month;
    });
    return months;
  }
}
