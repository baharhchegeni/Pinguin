import { HttpRequest, HttpResponse } from "@angular/common/http";
import { of } from "rxjs";
import { JiraIssue } from "../../model/Issue.model";
import * as data from '../../../../assets/mock-data/issues-sample_data.json'


let issues: any = (data as JiraIssue);

const getIssues = (request: HttpRequest<any>) => {
    return of(new HttpResponse({
        status: 200, body: data
    }));
};

export const selectHandler = (request: HttpRequest<any>) => {  
    const requestUrl = new URL(request.url);
    const pathname = requestUrl.pathname;
    switch (request.method) {
        case 'GET':
            return getIssues(request);
        default:
            return null as any;
    }
}