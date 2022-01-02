import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DateHelperService {

  constructor() { 
  }

   /** Given a start and end date return the difference in months */
  static monthDiff(dateFrom: Date, dateTo: Date): number {
    dateFrom = new Date(dateFrom);
    dateTo = new Date(dateTo);
    return dateTo.getMonth() - dateFrom.getMonth() +
      (12 * (dateTo.getFullYear() - dateFrom.getFullYear()));
  }

   /** Given a start and end date return the difference in days */
  static dateDifference(endDate: Date, startDate: Date, inlusiveOfEndDate: boolean = false): number {
    endDate = new Date(endDate);
    startDate = new Date(startDate);

    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    // Discard the time and time-zone information.
    const utc1 = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
    const utc2 = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());

    return Math.abs(Math.floor((utc2 - utc1) / _MS_PER_DAY)) + (inlusiveOfEndDate ? 2 : 1);
  }

  /** This method will give you a month name based on a month number */
  static getMonthName(date: Date): string {
    const options = { month: 'short' };
    return new Intl.DateTimeFormat('en-US').format(date);
  }

  static getMonthNameBasedOnDate(date: Date): string {    
    return monthNames[date.getMonth()];
  }

  /** Given a date this method will return the number of days in the specified month */
  static daysInMonth(date: Date): number {
    date = new Date(date);
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  static addMonths(date: Date, monthsToAdd: number): Date {
    date = new Date(date);
    // always assume just shifting one month across so set date to first day of month
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    return new Date(firstDayOfMonth.setMonth(monthsToAdd + firstDayOfMonth.getMonth()));
  } 
  
  static getStartDate(date: string, days: number): Date {
    
    var myCurrentDate=new Date(date);
    var myPastDate=new Date(myCurrentDate);
    var startDateInNumber = myPastDate.setDate(myPastDate.getDate() - days);
    var startDate = new Date(startDateInNumber);
    return startDate;
  }



  static getDifferenceInDays(date1: number, date2: number) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24);
  }
}


export const monthNames: string[] = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];