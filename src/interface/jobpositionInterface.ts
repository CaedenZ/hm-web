
export interface JobPosition {
    jobposition_id:string;
    business_title: string;
    country: string;
    jobgrade_id: string;
    jobgrade_name: string;
    location: string;
    jobfunction: string;
    job_name:string;
    sjobfunction: string;
    subjob_name:string;
    description: string;
    remarks: string;
    status: string;
    division: string;
    legal_entity: string;
}

export interface JobPositionState {
    jobpositionList: JobPosition[],
    selectedJobPosition?: JobPosition,
}

export interface CREATEJOBPOSITIONCRED {
    business_title: string;
    country: string;
    jobgrade_id: string;
    jobgrade_name: string;
    location: string;
    jobfunction: string;
    sjobfunction: string;
    description: string;
    remarks: string;
}

export interface UPDATEJOBPOSITIONCRED {
    jobposition_id:string;
    business_title: string;
    country: string;
    jobgrade_id: string;
    jobgrade_name: string;
    location: string;
    jobfunction: string;
    sjobfunction: string;
    description: string;
    remarks: string;
}
