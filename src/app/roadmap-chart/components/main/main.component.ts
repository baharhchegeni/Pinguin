import { Component, OnInit } from '@angular/core';
import { ChartService } from 'src/app/roadmap-chart/service/chart.service';
import { MonthAxis } from '../../model/chart.model';
import { JiraStateService } from '../../state/jira-state.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent  implements OnInit {
  monthAxis: MonthAxis[] = [];
  totalDaysOfAllMonths: number = 0;
  periodStartDate: Date = new Date();
  label: string = "";
  constructor(public chartService: ChartService, public jiraStateService: JiraStateService) { }

  ngOnInit() {  
    this.jiraStateService.chartState$.subscribe((x) => {
      this.totalDaysOfAllMonths = x?.jiraData.totalDaysOfAllMonths ?? 0 ;
      this.periodStartDate = x?.jiraData?.periodStartDate ?? new Date();
    });  
  }

  onChange(eve: Event) {
    debugger;
    var val = (eve.target as HTMLSelectElement)?.value;
    debugger;
    this.jiraStateService.selectLabel(val);
  }
}