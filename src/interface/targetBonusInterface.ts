export interface TargetBonus {
    target_bonus_id: string,
    jobgrade_id: string,
    global: number,
    country: string,
    min: string,
    mid: string,
    max: string,
}


export interface TargetBonusState {
    targetbonusList: TargetBonus[],
    selectTargetBonus: TargetBonus,
}

export interface CREATETARGETBONUSCRED {
    min: string,
    mid: string,
    max: string,
}

export interface UPDATETARGETBONUSCRED {
    target_bonus_id: string,
    min: string,
    mid: string,
    max: string,
}