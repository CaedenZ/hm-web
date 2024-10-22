export interface LongIncentive {
    longterm_incentive_id: string,
    value: string,
    type: string,
    investing_type: string,
    country: string,
    equity_type: string,
    job_grade: string,
    min:number,
    mid:number,
    max:number,
    share_symbol: string,
    share_exchange: string,
    share_price:number,
    currency: string,
    isOptional: string,
    year1:number,
    year2:number,
    year3:number,
    year4:number,
    year5:number,
    year6:number,
}


export interface LongIncentiveState {
    longincentiveList: LongIncentive[],
    selectLongIncentive: LongIncentive,
}

export interface CREATELONGINCENTIVECRED {
    value: string,
    type: string,
    investing_type: string,
    country: string,
    equity_type: string,
    job_grade: string,
    min:number,
    mid:number,
    max:number,
    share_symbol: string,
    share_exchange: string,
    share_price:number,
    currency: string,
    isOptional: string,
    year1:number,
    year2:number,
    year3:number,
    year4:number,
    year5:number,
    year6:number,
}

export interface UPDATELONGINCENTIVECRED {
    longterm_incentive_id: string,
    value: string,
    type: string,
    investing_type: string,
    country: string,
    equity_type: string,
    job_grade: string,
    min:number,
    mid:number,
    max:number,
    share_symbol: string,
    share_exchange: string,
    share_price:number,
    currency: string,
    isOptional: string,
    year1:number,
    year2:number,
    year3:number,
    year4:number,
    year5:number,
    year6:number,
}