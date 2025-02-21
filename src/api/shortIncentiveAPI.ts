import $axios from "../plugin/axios";
import { ShortIncentive, CREATESHORTINCENTIVECRED, UPDATESHORTINCENTIVECRED } from "../interface/shortIncentiveInterface";
import { sortRows } from "../helper/sort";

export const getShortIncentiveList = async (token, payload): Promise<ShortIncentive[]> => {

    let data = {
        company_id: payload,
        session_key: token,
    }
    const response = await $axios.post('/company/getShortIncentive', data)
    console.log(response.data.data)
    return sortRows(response.data.data, "country", "ASC")
}

export const createShortIncentive = async (token, payload: CREATESHORTINCENTIVECRED, companyid): Promise<ShortIncentive[]> => {

    let data = {
        ...payload,
        company_id: companyid,
        session_key: token,
    }

    const response = await $axios.post('/company/createShortIncentive', data)

    console.log(response.data.data)
    return response.data.data
}

export const updateShortIncentive = async (token, payload: UPDATESHORTINCENTIVECRED, companyid): Promise<ShortIncentive[]> => {

    let data = {
        ...payload,
        company_id: companyid,
        session_key: token,
    }

    const response = await $axios.post('/company/updateShortIncentive', data)

    console.log(response.data.data)
    return response.data.data
}

export const deleteShortIncentive = async (token, payload: string) => {

    let data = {
        shortterm_incentive_id: payload,
        session_key: token,
    }

    const response = await $axios.post('/company/deleteShortIncentive', data)
    console.log(response.data.data)
    return response.data.data
}

