import { Component, OnInit } from '@angular/core';
import { myHttpConfigValue } from './configs/config';
import { MonthAxis } from './roadmap-chart/model/chart.model';
import { ApiService } from './roadmap-chart/service/api/api.service';
import { ChartService } from './roadmap-chart/service/chart.service';
import { JiraStateService } from './roadmap-chart/state/jira-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {
  label: string ="";
  monthAxis: MonthAxis[] = [];
  totalDaysOfAllMonths: number = 0;
  constructor(public chartService: ChartService, private apiService: ApiService, public jiraStateService: JiraStateService) { }

  ngOnInit() { 
    
    let r = myHttpConfigValue.useMock;     
    this.apiService.getIssues().subscribe((x) => {            
      this.jiraStateService.setAPIResponse(x);
    });
  }

  setLabel() {
    this.jiraStateService.selectLabel(this.label);
  }
}
 



