export interface LongIncentive {
    longterm_incentive_id: string,
    value: string,
    type: string,
    global: number,
    country: string,
    investing_type: string,
    investing_breakdown: string,
    share_symbol: string,
    share_exchange: string,
    currency: string,
    isOptional: string,
}


export interface LongIncentiveState {
    longincentiveList: LongIncentive[],
    selectLongIncentive: LongIncentive,
}

export interface CREATELONGINCENTIVECRED {
    value: string,
    type: string,
    investing_type: string,
    investing_breakdown: string,
    share_symbol: string,
    share_exchange: string,
    currency: string,
    isOptional: string,
}

export interface UPDATELONGINCENTIVECRED {
    longincentive_id: string,
    value: string,
    type: string,
    investing_type: string,
    investing_breakdown: string,
    share_symbol: string,
    share_exchange: string,
    currency: string,
    isOptional: string,
}