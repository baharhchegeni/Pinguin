import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { IGanttChartEvent, IGanttChartRow, MonthAxis } from '../../model/chart.model';
import { ChartService } from '../../service/chart.service';
import { DateHelperService } from '../../../utils/date-helper.service';
import { filter } from 'rxjs/operators';
import { JiraStateService } from '../../state/jira-state.service';

@Component({
  selector: 'app-chart-body',
  templateUrl: './chart-body.component.html',
  styleUrls: ['./chart-body.component.css']
})
export class ChartBodyComponent implements OnInit {

  @Input() totalDaysOfAllMonths: number = 0;
  @Input() periodStartDate:Date = new Date();
  elements = new Set<string>();
  filter: string = "";
  //rows$: Observable<IGanttChartRow[]> ;
  // filteredRows() {
  //   if (this.filter) {
  //     return this.chartService.getIssueRows$;
  //   }
  //   return this.chartService.getIssueRows$;
  // }
  //filteredIssues$:  IGanttChartRow[];
  constructor(public chartService: ChartService, public jiraStateService: JiraStateService) { }

  ngOnInit(): void {
   //this.rows$ = this.chartService.issueResponse; 
  }

   /** Given an event calculate the percentage of days over the total gantt chart period */
   getEventDurationPercentage(event: IGanttChartEvent): number {
    
    var endDate =  event.startDate;
    const eventDays = DateHelperService.dateDifference(event.endDate, event.startDate) ;
    return (eventDays/this.totalDaysOfAllMonths) * 100;

  }

  /** Given a date return the percentage of days over the total gantt chart period */
  getEventOffsetPercentage(eventStartDate: Date): number {
    debugger;
    const daysPriorToEventStart = DateHelperService.dateDifference(eventStartDate, this.periodStartDate);
    return ((daysPriorToEventStart-1)/this.totalDaysOfAllMonths)*100;
  }

  getColour(i: number) {
    return "rgb(241, 231, 77)";
  }


  addElement() {

  }
}
