export interface JiraIssue {
    issues?: Issue[];
}

export interface Issue {
    key?: string,
    fields?: {
        issuetype: {
            name: string;
            description: string,
            subtask: boolean;
            iconUrl: string;
        },
        project: {
            name: string,
        }
        labels: string[],
        timetracking: {
            originalEstimate: string,
            originalEstimateSeconds: number
        },
        duedate?: string,
        summary?: string,

    }
}

export interface issueMap {
    uniqueLabels: string,
    labels: string[],
    duedateIssues: { [key: string]: Issue[] };
}

