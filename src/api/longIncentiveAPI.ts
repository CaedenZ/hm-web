import $axios from "../plugin/axios";
import { LongIncentive, CREATELONGINCENTIVECRED, UPDATELONGINCENTIVECRED } from "../interface/longIncentiveInterface";

export const getLongIncentiveList = async (token, payload): Promise<LongIncentive[]> => {

    let data = {
        company_id: payload,
        session_key: token,
    }
    const response = await $axios.post('/company/getLongIncentive', data)
    console.log(response.data.data)
    return response.data.data
}

export const createLongIncentive = async (token, payload: CREATELONGINCENTIVECRED, companyid): Promise<LongIncentive[]> => {

    let data = {
        ...payload,
        company_id: companyid,
        session_key: token,
    }

    const response = await $axios.post('/company/createLongIncentive', data)

    console.log(response.data.data)
    return response.data.data
}

export const updateLongIncentive = async (token, payload: UPDATELONGINCENTIVECRED): Promise<LongIncentive[]> => {

    let data = {
        ...payload,
        session_key: token,
    }

    const response = await $axios.post('/company/updateLongIncentive', data)

    console.log(response.data.data)
    return response.data.data
}

export const deleteLongIncentive = async (token, payload: string) => {

    let data = {
        longterm_incentive_id: payload,
        session_key: token,
    }

    const response = await $axios.post('/company/deleteLongIncentive', data)
    console.log(response.data.data)
    return response.data.data
}

