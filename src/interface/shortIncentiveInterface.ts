export interface ShortIncentive {
    shortterm_incentive_id: string,
    jobgrade_id: string,
    jobgrade_name: string,
    jobgrade_global: string,
    type: string,
    country: string,
    value: string,
    isOptional: string,
    value_type: string,
}


export interface ShortIncentiveState {
    shortincentiveList: ShortIncentive[],
    selectShortIncentive: ShortIncentive,
}

export interface CREATESHORTINCENTIVECRED {
    jobgrade_id: string,
    jobgrade_name: string,
    jobgrade_global: string,
    type: string,
    country: string,
    value: string,
    isOptional: string,
    value_type: string,
}

export interface UPDATESHORTINCENTIVECRED {
    shortterm_incentive_id: string,
    jobgrade_id: string,
    jobgrade_name: string,
    jobgrade_global: string,
    type: string,
    country: string,
    value: string,
    isOptional: string,
    value_type: string,
}