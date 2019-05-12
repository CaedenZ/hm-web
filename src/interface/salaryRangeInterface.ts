export interface SalaryRange {
    salary_range_id: string,
    jobgrade_id: string,
    jobgrade_name: string,
    jobgrade_global: number,
    type: string,
    country: string,
    min: string,
    mid: string,
    max: string,
}


export interface SalaryRangeState {
    salaryrangeList: SalaryRange[],
    selectSalaryRange: SalaryRange,
}

export interface CREATESALARYRANGECRED {
    type: string,
    global: number,
    min: string,
    mid: string,
    max: string,
}

export interface UPDATESALARYRANGECRED {
    type: string,
    global: number,
    min: string,
    mid: string,
    max: string,
}