import $axios from "../plugin/axios";
import { Sector, CREATESECTORCRED, CREATEINDUSTRYCRED, UPDATESECTORCRED, UPDATEINDUSTRYCRED } from "../interface/sectorInterface";

export const getSectorList = async (payload): Promise<Sector[]> => {

    console.log(payload)
    const response = await $axios.post('/company/getSector', { session_key: payload })
    console.log(response.data.data)
    return response.data.data
}

export const createSector = async (token, payload: CREATESECTORCRED) => {

    let data = {
        ...payload,
        session_key: token,
    }

    const response = await $axios.post('/company/createSector', data)
    console.log(response.data.data)
    return response.data.data
}

export const createIndustry = async (token, payload: CREATEINDUSTRYCRED) => {
    console.log(payload)
    let data = {
        ...payload,
        session_key: token,
    }

    const response = await $axios.post('/company/createIndustry', data)
    console.log(response.data.data)
    return response.data.data
}

export const updateSector = async (token, payload: UPDATESECTORCRED) => {

    let data = {
        ...payload,
        session_key: token,
    }

    const response = await $axios.post('/company/updateSector', data)
    console.log(response.data.data)
    return response.data.data
}

export const updateIndustry = async (token, payload: UPDATEINDUSTRYCRED) => {
    console.log(payload)
    let data = {
        ...payload,
        session_key: token,
    }

    const response = await $axios.post('/company/updateIndustry', data)
    console.log(response.data.data)
    return response.data.data
}


export const deleteSector = async (token, payload: string): Promise<any> => {

    let data = {
        sector_id: payload,
        session_key: token,
    }

    const response = await $axios.post('/company/deleteSector', data)
    console.log(response.data.data)
    return response.data.data
}

export const deleteIndustry = async (token, payload: string): Promise<any> => {
    console.log(payload)
    let data = {
        industry_id: payload,
        session_key: token,
    }

    const response = await $axios.post('/company/deleteIndustry', data)
    console.log(response.data.data)
    return response.data.data
}

