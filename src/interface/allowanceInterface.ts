export interface Allowances {
    allowance_id: string,
    jobgrade_id: string,
    jobgrade_name: string,
    jobgrade_global: number,
    type: string,
    country: string,
    value: string,
    isBonus: string,
    isOptional: string,
    value_type: number,
}


export interface AllowancesState {
    allowancesList: Allowances[],
    selectAllowances: Allowances,
}

export interface CREATEALLOWANCESCRED {
    jobgrade_id: string,
    jobgrade_name: string,
    jobgrade_global: number,
    type: string,
    country: string,
    value: string,
    isBonus: string,
    isOptional: string,
    value_type: number,
}

export interface UPDATEALLOWANCESCRED {
    allowances_id: string,
    jobgrade_id: string,
    jobgrade_name: string,
    jobgrade_global: number,
    type: string,
    country: string,
    value: string,
    isBonus: string,
    isOptional: string,
    value_type: number,
}