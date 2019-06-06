import $axios from "../plugin/axios";
import { Allowances, CREATEALLOWANCESCRED, UPDATEALLOWANCESCRED } from "../interface/allowanceInterface";

export const getAllowancesList = async (token, payload): Promise<Allowances[]> => {

    const data = {
        company_id: payload,
        session_key: token
    }
    const response = await $axios.post('/company/getAllowance', data)
    console.log(response.data.data)
    if(response.data.error) {
        return [];
    } else {
        return response.data.data
    }
}

export const createAllowances = async (token, payload: CREATEALLOWANCESCRED, companyid): Promise<Allowances[]> => {

    let data = {
        ...payload,
        company_id: companyid,
        session_key: token,
    }

    const response = await $axios.post('/company/createAllowance', data)

    console.log(response.data.data)
    return response.data.data
}

export const updateAllowances = async (token, payload: UPDATEALLOWANCESCRED): Promise<Allowances[]> => {

    let data = {
        ...payload,
        session_key: token,
    }

    const response = await $axios.post('/company/updateAllowance', data)

    console.log(response.data.data)
    return response.data.data
}

export const deleteAllowances = async (token, payload: string) => {

    let data = {
        allowance_id: payload,
        session_key: token,
    }

    const response = await $axios.post('/company/deleteAllowance', data)
    console.log(response.data.data)
    return response.data.data
}

