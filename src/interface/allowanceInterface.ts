export interface JobGrade {
    jobgrade_id: string,
    jobgrade_name: string,
    type: string,
    global: number,
    country: string,
    salary_range: string,
    allowance: string,
    target_bonus: string,
}


export interface JobGradeState {
    jobgradeList: JobGrade[],
    selectJobGrade: JobGrade,
}

export interface CREATEJOBGRADECRED {
    jobgrade_name: string,
    type: string,
    global: number,
    country: string,
}

export interface UPDATEJOBGRADECRED {
    jobgrade_id: string,
    jobgrade_name: string,
    type: string,
    global: number,
    country: string,
}