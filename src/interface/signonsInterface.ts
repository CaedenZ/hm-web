export interface Signons {
    signons_id: string,
    type: string,
    value: string,
    isOptional: string,
}


export interface SignonsState {
    signonsList: Signons[],
    selectSignons: Signons,
}

export interface CREATESIGNONSCRED {
    type: string,
    value: string,
    isOptional: string,
}

export interface UPDATESIGNONSCRED {
    signons_id: string,
    type: string,
    value: string,
    isOptional: string,
}