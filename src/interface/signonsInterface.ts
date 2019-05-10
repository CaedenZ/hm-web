export interface Signons {
    signons_id: string,
    company_id: string,
    type: string,
    value: string,
    isOptional: number,
    signons_breakdown: string,
}


export interface SignonsState {
    signonsList: Signons[],
    selectSignons: Signons,
}

export interface CREATESIGNONSCRED {
    signons_name: string,
    type: string,
    global: number,
    country: string,
}

export interface UPDATESIGNONSCRED {
    signons_id: string,
    signons_name: string,
    type: string,
    global: number,
    country: string,
}