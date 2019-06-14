import $axios from "../plugin/axios";
import { Signons, CREATESIGNONSCRED, UPDATESIGNONSCRED } from "../interface/signonsInterface";

export const getSignonsList = async (token, payload): Promise<Signons[]> => {

    let data = {
        company_id: payload,
        session_key: token,
    }
    const response = await $axios.post('/company/getSignons', data)
    console.log(response.data.data)
    return response.data.data
}

export const createSignons = async (token, payload: CREATESIGNONSCRED, companyid): Promise<Signons[]> => {

    let data = {
        ...payload,
        company_id: companyid,
        session_key: token,
    }

    const response = await $axios.post('/company/createSignons', data)

    console.log(response.data.data)
    return response.data.data
}

export const updateSignons = async (token, payload: UPDATESIGNONSCRED, companyid): Promise<Signons[]> => {

    let data = {
        ...payload,
        company_id: companyid,
        session_key: token,
    }

    const response = await $axios.post('/company/updateSignons', data)

    console.log(response.data.data)
    return response.data.data
}

export const deleteSignons = async (token, payload: string) => {

    let data = {
        signons_id: payload,
        session_key: token,
    }

    const response = await $axios.post('/company/deleteSignons', data)
    console.log(response.data.data)
    return response.data.data
}

