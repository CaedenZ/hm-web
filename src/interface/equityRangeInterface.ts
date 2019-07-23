export interface EquityRange {
    equity_range_id: string,
    lti_id: string,
    jobgrade_id: string,
    jobgrade_name: string,
    jobgrade_global: string,
    type: string,
    min: string,
    mid: string,
    max: string,
    country: string,
    value_type: string,
}


export interface EquityRangeState {
    equityrangeList: EquityRange[],
    selectEquityRange: EquityRange,
}

export interface CREATEEQUITYRANGECRED {
    jobgrade_id: string,
    jobgrade_name: string,
    jobgrade_global: string,
    type: string,
    min: string,
    mid: string,
    max: string,
    country: string,
    value_type: string,
}

export interface UPDATEEQUITYRANGECRED {
    equity_range_id: string,
    lti_id: string,
    jobgrade_id: string,
    jobgrade_name: string,
    jobgrade_global: string,
    type: string,
    min: string,
    mid: string,
    max: string,
    country: string,
    value_type: string,
}
