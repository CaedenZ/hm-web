import $axios from "../plugin/axios";
import { Company, Unit, CREATECOMPANYCRED, UPDATECOMPANYCRED, CREATEUNITCRED, UPDATEUNITCRED, UPDATEENTITYCRED, CREATEENTITYCRED, Entity, Division } from "../interface/companyInterface";

export const getCompanyList = async (payload): Promise<Company[]> => {

    console.log(payload)
    const response = await $axios.post('/company/', { session_key: payload })
    return response.data.data
}

export const getChildCompanyList = async (payload, ID): Promise<Company[]> => {
    const response = await $axios.post('/company/sub', { session_key: payload, company_id: ID })
    console.log(response.data.data)
    return response.data.data
}


export const createCompany = async (token, payload: CREATECOMPANYCRED): Promise<Company[]> => {

    let data = {
        ...payload,
        session_key: token,
    }

    const response = await $axios.post('/company/createCompany', data)
    console.log(response.data.data)
    return response.data.data
}
export const updateCompany = async (token, payload: UPDATECOMPANYCRED): Promise<Company[]> => {
    // todo
    let data = {
        ...payload,
        session_key: token,
    }
    const response = await $axios.post('/company/updateCompany', data)
    console.log(response.data.data)
    return response.data.data
}
export const deleteCompany = async (token, identifier, payload: string) => {
    // todo
    let data = {
        company_id: payload,
        session_key: token,
        identifier: identifier,
    }

    const response = await $axios.post('/company/deleteCompany', data)
    console.log(response.data.data)
    return response.data.data
}

export const createEntity = async (token, payload: CREATEENTITYCRED): Promise<Entity[]> => {
    // todo
    let data = {
        ...payload,
        session_key: token,
    }

    const response = await $axios.post('/company/createEntity', data)
    console.log(response.data.data)
    return response.data.data
}
export const updateEntity = async (token, payload: UPDATEENTITYCRED): Promise<Entity[]> => {
    // todo
    let data = {
        ...payload,
        session_key: token,
    }

    const response = await $axios.post('/company/updateEntity', data)
    console.log(response.data.data)
    return response.data.data
}
export const deleteEntity = async (token, payload: string) => {
    // todo
    let data = {
        id: payload,
        session_key: token,
    }

    const response = await $axios.post('/company/deleteEntity', data)
    console.log(response.data.data)
    return response.data.data
}


export const getUnitList = async (token, identifier, ID): Promise<Unit[]> => {

    console.log(token)
    const response = await $axios.post('/company/getUnitList/', { session_key: token, identifier: identifier, id: ID })
    return response.data.data
}

export const getDivisionList = async (token, ID): Promise<Division[]> => {

    console.log(token)
    const response = await $axios.post('/company/getAllUnit/', { session_key: token, id: ID })
    return response.data.data
}

export const createUnit = async (token, identifier, payload: CREATEUNITCRED): Promise<Unit[]> => {


    let data = {
        ...payload,
        session_key: token,
        identifier: identifier,
    }
    if ((identifier === 1) && (payload.parent_unit !== payload.main_unit)) {
        data.identifier = 2
    }

    const response = await $axios.post('/company/createUnit', data)
    console.log(response.data.data)
    return response.data.data
}

export const updateUnit = async (token, identifier, payload: UPDATEUNITCRED): Promise<Unit[]> => {

    let data = {
        ...payload,
        identifier: identifier,
        session_key: token,
    }

    const response = await $axios.post('/company/updateUnit', data)
    console.log(response.data.data)
    return response.data.data
}

export const deleteUnit = async (token, identifier, payload: string): Promise<Unit[]> => {
    let data = {
        session_key: token,
        identifier: identifier,
        unit_id: payload,
    }

    const response = await $axios.post('/company/deleteUnit', data)
    console.log(response.data.data)
    return response.data.data
}

export const getCompanyByCountry = async (token, id, payload: string): Promise<any[]> => {
    let data = {
        session_key: token,
        country_name: payload,
        company_id: id,
    }

    const response = await $axios.post('/company/getCompanyByCountry', data)
    console.log(response.data.data)
    return response.data.data
}

export const getCompanyByRegion = async (token, id, payload: string): Promise<any[]> => {
    let data = {
        session_key: token,
        region_id: payload,
        company_id: id,
    }

    const response = await $axios.post('/company/getCompanyByRegion', data)
    console.log(response.data.data)
    return response.data.data
}