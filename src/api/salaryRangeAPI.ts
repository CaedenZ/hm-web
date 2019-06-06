import $axios from "../plugin/axios";
import { SalaryRange, CREATESALARYRANGECRED, UPDATESALARYRANGECRED } from "../interface/salaryRangeInterface";

export const getSalaryRangeList = async (token, payload): Promise<SalaryRange[]> => {

    let data = {
        company_id: payload,
        session_key: token,
    }
    const response = await $axios.post('/company/getSalaryRange', data)
    console.log(response.data.data)
    return response.data.data
}

export const createSalaryRange = async (token, payload: CREATESALARYRANGECRED, companyid): Promise<SalaryRange[]> => {

    let data = {
        ...payload,
        company_id: companyid,
        session_key: token,
    }

    const response = await $axios.post('/company/createSalaryRange', data)

    console.log(response.data.data)
    return response.data.data
}

export const updateSalaryRange = async (token, payload: UPDATESALARYRANGECRED, companyid): Promise<SalaryRange[]> => {

    let data = {
        ...payload,
        company_id: companyid,
        session_key: token,
    }

    const response = await $axios.post('/company/updateSalaryRange', data)

    console.log(response.data.data)
    return response.data.data
}

export const deleteSalaryRange = async (token, payload: string) => {

    let data = {
        salary_range_id: payload,
        session_key: token,
    }

    const response = await $axios.post('/company/deleteSalaryRange', data)
    console.log(response.data.data)
    return response.data.data
}

