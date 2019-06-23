import $axios from "../plugin/axios";
import { sortRows } from "../helper/sort";

export const getBreakdownList = async (token, payload): Promise<any[]> => {

    let data = {
        signons_id: payload,
        session_key: token,
    }
    const response = await $axios.post('/company/getSignonsBreakdown', data)
    console.log(response.data.data)
    return sortRows(response.data.data, "type", "ASC")
}

export const createBreakdown = async (token, payload: any, companyid): Promise<any[]> => {

    let data = {
        ...payload,
        signons_id: companyid,
        session_key: token,
    }

    const response = await $axios.post('/company/createSignonsBreakdown', data)

    console.log(response.data.data)
    return response.data.data
}

export const updateBreakdown = async (token, payload: any, companyid): Promise<any[]> => {

    let data = {
        ...payload,
        signons_id: companyid,
        session_key: token,
    }

    const response = await $axios.post('/company/updateSignonsBreakdown', data)

    console.log(response.data.data)
    return response.data.data
}

export const deleteBreakdown = async (token, payload: string) => {

    let data = {
        breakdown_id: payload,
        session_key: token,
    }

    const response = await $axios.post('/company/deleteSignonsBreakdown', data)
    console.log(response.data.data)
    return response.data.data
}

