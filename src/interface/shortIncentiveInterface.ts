export interface ShortIncentive {
    shortterm_incentive_id: string,
    jobgrade_id: string,
    jobgrade_name: string,
    jobgrade_global: number,
    type: string,
    country: string,
    value: string,
    isOptional: number,
    value_type: number,
}


export interface ShortIncentiveState {
    shortincentiveList: ShortIncentive[],
    selectShortIncentive: ShortIncentive,
}

export interface CREATESHORTINCENTIVECRED {
    shortincentive_name: string,
    type: string,
    global: number,
    country: string,
}

export interface UPDATESHORTINCENTIVECRED {
    shortincentive_id: string,
    shortincentive_name: string,
    type: string,
    global: number,
    country: string,
}