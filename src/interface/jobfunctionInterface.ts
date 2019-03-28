export interface JobFunction {
    jobfunction_id: string;
    job_name: string;
    description: string;
    sjobfunction: SubJobFunction[]
}

export interface SubJobFunction {
    subjob_name: string;
    description: string;
    sjobfunction_id: string;
}

export interface JobFunctionState {
    jobFunctionList: JobFunction[],
    selectedJobFunction?: string,
}