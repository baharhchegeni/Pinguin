import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { AppConfig, APP_CONFIG } from "src/app/app.module";
import { IssueAdapter, IssuesResponse } from "./Issue.adapter";


@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient, private issueAdapter: IssueAdapter,  @Inject(APP_CONFIG) private appConfig: AppConfig) {
    }

    getIssues(): Observable<IssuesResponse> {

       debugger;
        return this.http.get(this.appConfig.apiEndpoint,{
            headers: new HttpHeaders({
          
               'Authorization': 'Bearer be3YPsPJWzh3PHws2EqAEC99',
               'Content-Type': 'application/json',
            }),
            responseType: 'json'
         }).pipe(
            map((data: any) => this.issueAdapter.adapt(data)) 
        );
    }
}