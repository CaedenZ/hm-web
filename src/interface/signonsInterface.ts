export interface Signons {
    signons_id: string,
    type: string,
    value: string,
    isOptional: string,
    month1: string,
    month2: string,
    month3: string,
    month4: string,
    month5: string,
    month6: string,
}


export interface SignonsState {
    signonsList: Signons[],
    selectSignons: Signons,
}

export interface CREATESIGNONSCRED {
    type: string,
    value: string,
    isOptional: string,
    month1: string,
    month2: string,
    month3: string,
    month4: string,
    month5: string,
    month6: string,
}

export interface UPDATESIGNONSCRED {
    signons_id: string,
    type: string,
    value: string,
    isOptional: string,
    month1: string,
    month2: string,
    month3: string,
    month4: string,
    month5: string,
    month6: string,
}