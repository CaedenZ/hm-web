export interface JobChart {
    column_name: string,
    column_data: Cell[],
}

export interface Cell {
    profile_id: number,
    name: string,
    rank: number,
    value: string,
    company_id: any,
    isCompany: number,
}


export interface JobChartState {
    jobchartList: JobChart[],
}


export interface UPDATECELL {
    profile_id: number,
    name: string,
    rank: number,
    value: string,
    company_id: any,
    isCompany: number,
}
