import $axios from "../plugin/axios";
import { Region, CREATEREGIONCRED, UPDATEREGIONCRED } from "../interface/regionInterface";

export const getRegionList = async (payload, id): Promise<Region[]> => {


    const response = await $axios.post('/company/getCompanyRegionList', { session_key: payload, company_id: id })
    console.log(response.data.data)
    return response.data.data
}

export const createRegion = async (token, payload: CREATEREGIONCRED, companyId: string) => {
    console.log(payload)
    let data = {
        ...payload,
        session_key: token,
        company_id: companyId
    }

    const response = await $axios.post('/company/createCompanyRegion', data)
    console.log(response.data.data)
    return response.data.data
}

export const updateRegion = async (token, payload: UPDATEREGIONCRED, companyId: string) => {
    console.log(payload)
    let data = {
        ...payload,
        session_key: token,
        company_id: companyId
    }

    const response = await $axios.post('/company/updateCompanyRegion', data)
    console.log(response.data.data)
    return response.data.data
}

export const deleteRegion = async (token, payload: string) => {
    console.log(payload)
    let data = {
        region_id: payload,
        session_key: token,
    }

    console.log(data)
    const response = await $axios.post('/company/deleteCompanyRegion', data)
    return response.data.data
}