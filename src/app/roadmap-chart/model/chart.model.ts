export interface IGanttChartEvent {
    key: string,
    startDate: Date;
    endDate: Date;
    name: string;

    issuetype?: {
        name: string;
        description: string,
        subtask: boolean;
        iconUrl: string;
    },
    project?: {
        name: string,
    }
    labels?: string[],
    timetracking?: {
        originalEstimate: string,
        originalEstimateSeconds: number
    },
    duedate?: string,
    summary?: string,
    period?: number

}

export interface IGanttChartMileStone {
    name: string;
    date: Date;
}

// The Gantt chart component will take in a collection of this object model
export interface IGanttChartRow {
    name: string;
    labels?: string[],
    label?: string,
    events: IGanttChartEvent[];
    mileStones: IGanttChartMileStone[];
}

export interface MonthAxis {
    monthName: string,
    monthDurationPercentage: number
}