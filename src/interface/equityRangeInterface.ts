export interface EquityRange {
    equity_range_id: string,
    lti_id: string,
    jobgrade_id: string,
    jobgrade_name: string,
    type: string,
    min: string,
    mid: string,
    max: string,
    country: string,
    global: number,
    value_type: number,
}


export interface EquityRangeState {
    equityrangeList: EquityRange[],
    selectEquityRange: EquityRange,
}

export interface CREATEEQUITYRANGECRED {
    equityrange_name: string,
    type: string,
    global: number,
    country: string,
}

export interface UPDATEEQUITYRANGECRED {
    equityrange_id: string,
    equityrange_name: string,
    type: string,
    global: number,
    country: string,
}
