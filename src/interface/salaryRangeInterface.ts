export interface SalaryRange {
    salary_range_id: string,
    jobgrade_id: string,
    jobgrade_name: string,
    jobgrade_global: string,
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
    jobgrade_id: string,
    jobgrade_name: string,
    jobgrade_global: string,
    type: string,
    country: string,
    min: string,
    mid: string,
    max: string,
}

export interface UPDATESALARYRANGECRED {
    salary_range_id: string,
    jobgrade_id: string,
    jobgrade_name: string,
    jobgrade_global: string,
    type: string,
    country: string,
    min: string,
    mid: string,
    max: string,
}