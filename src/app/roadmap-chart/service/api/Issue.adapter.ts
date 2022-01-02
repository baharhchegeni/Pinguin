import { Injectable } from "@angular/core";
import { adapter } from "../../../core/adapter.interface";
import { IGanttChartEvent, IGanttChartRow, MonthAxis } from "../../model/chart.model";
import { Issue, JiraIssue } from "../../model/Issue.model";
import { ChartService } from "../chart.service";
import { DateHelperService } from "../../../utils/date-helper.service";

@Injectable({
  providedIn: 'root'
})
export class IssueAdapter implements adapter<IssuesResponse> {
  adapt(x: JiraIssue) {
    ;
    var lablesIssues: Map<string, Issue[]> = new Map<string, Issue[]>();
    var rows: IGanttChartRow[] = [];
    var totalDaysOfAllMonths = 0;
    var totalDurationDays = 0;
    var timeAxis: MonthAxis[] = [];
    var startDate: Date = new Date();
    var endDate: Date = new Date();
    var labels: string[][];
     
    if (x.issues) {
      debugger;
      var dueDates = x.issues.map(i => i?.fields?.duedate ?? "").sort() ?? [];
      dueDates = [...new Set(dueDates)].filter(x => x);
      startDate = new Date(dueDates[0]);

      labels = x.issues.map(i => i.fields?.labels ?? []);

      let yAxisItems = labels.reduce((accumulator, value) => accumulator.concat(value), []);
      //Todo....
      yAxisItems = yAxisItems.filter((x, i) => yAxisItems.indexOf(x) == i);

      yAxisItems.forEach((y) => {
        const issues = x.issues?.filter((i: Issue) => i.fields?.labels.some(l => l == y) && i.fields.labels.some(l => l.toLocaleLowerCase() == 'roadmap'));
        lablesIssues.set(y, (issues ?? []));
      });

      for (let [key, value] of lablesIssues) {
        let events = value.map(x => {
          if (x.fields && x.fields.duedate) {
            var estimateInDays = x.fields.timetracking.originalEstimateSeconds / (24 * 3600);
            const t = value[0].fields?.project;
            let event: IGanttChartEvent = {
              key: x.key ?? "",
              startDate: DateHelperService.getStartDate(x.fields.duedate, estimateInDays),
              endDate: new Date(x.fields.duedate),
              name: value[0].fields?.project.name ?? "",
              labels: value[0].fields?.labels,
              duedate: x.fields.duedate,
              project: {
                name: x?.fields?.project?.name
              },
              summary: x.fields.summary,
              period: DateHelperService.dateDifference(new Date(x.fields.duedate), DateHelperService.getStartDate(x.fields.duedate, estimateInDays)) ?? 0
            };
            return event;
          }
          return {}
        });
        
        
        const row: IGanttChartRow = {
          name: key,
          labels: value[0].fields?.labels,
          events: events.filter(x => x !== undefined && x !== null) as IGanttChartEvent[],
          mileStones: [],
          label: key
        };
        
        rows.push(row);
      }

      endDate = new Date(dueDates[dueDates.length - 1]);
      totalDaysOfAllMonths = ChartService.calculateTotalDaysOfAllMonths(startDate, endDate);
      timeAxis = ChartService.getMonths(startDate, endDate);
      totalDurationDays = DateHelperService.dateDifference(startDate, endDate, true);     

      var mappedData: IssuesResponse = {
        rows: rows,
        totalDaysOfAllMonths: totalDaysOfAllMonths,
        totalDurationDays: totalDurationDays,
        months: timeAxis,
        startDate: startDate,
        endDate: endDate,
        periodStartDate: new Date(startDate.getFullYear(), startDate.getMonth(), 1),
        labels: yAxisItems
      };

      return mappedData;
    }

    return {};
  }
}

export interface IssuesResponse {
  rows?: IGanttChartRow[],
  totalDaysOfAllMonths?: number,
  totalDurationDays?: number,
  months?: MonthAxis[],
  startDate?: Date,
  endDate?: Date,
  periodStartDate?: Date,
  labels?: string[]
}