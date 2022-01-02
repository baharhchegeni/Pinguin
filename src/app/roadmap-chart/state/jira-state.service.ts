import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IGanttChartRow, MonthAxis } from "../model/chart.model";
import { IssuesResponse } from "../service/api/Issue.adapter";
import { StateService } from "../../core/state.service";

interface ChartState {
    jiraData: IssuesResponse,  
    selectedLabel: string
}

const initialState: ChartState = {
    jiraData: {
        rows: [],
        totalDaysOfAllMonths: 0,
        totalDurationDays: 0,
        months: [],
        startDate: new Date(),
        endDate:  new Date(),
    },
    selectedLabel: ''
};

@Injectable({
    providedIn: 'root'
})
export class JiraStateService extends StateService<ChartState>{
    chartState$: Observable<ChartState> = this.select(state => state);

    issues$: Observable<IGanttChartRow[]> = this.select(state => state?.jiraData.rows ?? [] );

    selectedIssues$: Observable<IGanttChartRow[]> = this.select((state) => {        
        return state?.jiraData?.rows?.filter((item) =>  item.labels?.some(x => !state?.selectedLabel || x == state?.selectedLabel)  )  ?? [];      
    });

    months$: Observable<MonthAxis[]> = this.select(s => s.jiraData.months??[]);

    selectedLabel$: Observable<string> = this.select((state) => state?.selectedLabel );

    constructor() {
        super(initialState);
    }

    // addTodo(todo: Todo) {
    //     this.setState({ todos: [...this.state.todos, todo] })
    // }

    selectLabel(label: string) {
        this.setState({ selectedLabel: label });
    }

    setAPIResponse(apiResponse: IssuesResponse) {
       this.setState({jiraData: apiResponse})
    }
}