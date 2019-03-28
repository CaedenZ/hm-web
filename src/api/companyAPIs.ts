import $axios from "../plugin/axios";
import { Company } from "../interface/companyInterface";
import { CreateCompanyState } from "../scenes/CompanyPage/create";

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

export const getUnitList = async (token, identifier, ID): Promise<Company[]> => {

    console.log(token)
    const response = await $axios.post('/company/unit/', { session_key: token, type: identifier, id: ID })
    return response.data.data
}

export const createCompany = async (token, payload: CreateCompanyState): Promise<Company[]> => {

    let data = {
        ...payload,
        session_key: token,
    }

    const response = await $axios.post('/company/createCompany', data)
    console.log(response.data.data)
    return response.data.data
}