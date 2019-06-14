import $axios from "../plugin/axios";
import { TargetBonus, CREATETARGETBONUSCRED, UPDATETARGETBONUSCRED } from "../interface/targetBonusInterface";
import { sortRows } from "../helper/sort";

export const getTargetBonusList = async (token, payload): Promise<TargetBonus[]> => {

    let data = {
        company_id: payload,
        session_key: token,
    }
    const response = await $axios.post('/company/getTargetBonus', data)
    console.log(response.data.data)
    return sortRows(response.data.data,"jobgrade_name","ASC")
}

export const createTargetBonus = async (token, payload: CREATETARGETBONUSCRED, companyid): Promise<TargetBonus[]> => {

    let data = {
        ...payload,
        company_id: companyid,
        session_key: token,
    }

    const response = await $axios.post('/company/createTargetBonus', data)

    console.log(response.data.data)
    return response.data.data
}

export const updateTargetBonus = async (token, payload: UPDATETARGETBONUSCRED): Promise<TargetBonus[]> => {

    let data = {
        ...payload,
        session_key: token,
    }

    const response = await $axios.post('/company/updateTargetBonus', data)

    console.log(response.data.data)
    return response.data.data
}

export const deleteTargetBonus = async (token, payload: string) => {

    let data = {
        target_bonus_id: payload,
        session_key: token,
    }

    const response = await $axios.post('/company/deleteTargetBonus', data)
    console.log(response.data.data)
    return response.data.data
}

