import $axios from "../plugin/axios";
import { Location, CREATELOCATIONCRED, UPDATELOCATIONCRED } from "../interface/locationInterface";

export const getLocationList = async (payload, id): Promise<Location[]> => {


    const response = await $axios.post('/company/getCompanyLocationList', { session_key: payload, company_id: id })
    console.log(response.data.data)
    return response.data.data
}

export const createLocation = async (token, payload: CREATELOCATIONCRED, companyId: string) => {
    console.log(payload)
    let data = {
        ...payload,
        session_key: token,
        company_id: companyId
    }

    const response = await $axios.post('/company/createCompanyLocation', data)
    console.log(response.data.data)
    return response.data.data
}

export const updateLocation = async (token, payload: UPDATELOCATIONCRED, companyId: string) => {
    console.log(payload)
    let data = {
        ...payload,
        session_key: token,
        company_id: companyId
    }

    const response = await $axios.post('/company/updateCompanyLocation', data)
    console.log(response.data.data)
    return response.data.data
}

export const deleteLocation = async (token, payload: string) => {
    console.log(payload)
    let data = {
        location_id: payload,
        session_key: token,
    }

    console.log(data)
    const response = await $axios.post('/company/deleteCompanyLocation', data)
    return response.data.data
}
