import $axios from "../plugin/axios";
import { JobGrade, CREATEJOBGRADECRED, UPDATEJOBGRADECRED } from "../interface/jobgradeInterface";
import { sortRows } from "../helper/sort";

export const getJobGradeList = async (token, payload): Promise<JobGrade[]> => {

    let data = {
        company_id: payload,
        session_key: token,
    }
    const response = await $axios.post('/company/getJobGrade', data)
    console.log(response.data.data)
    
    return sortRows(response.data.data,"jobgrade_name","ASC")
}

export const createJobGrade = async (token, payload: CREATEJOBGRADECRED, companyid): Promise<JobGrade[]> => {

    let data = {
        ...payload,
        company_id: companyid,
        session_key: token,
    }

    const response = await $axios.post('/company/createJobGrade', data)

    console.log(response.data.data)
    return response.data.data
}

export const updateJobGrade = async (token, payload: UPDATEJOBGRADECRED): Promise<JobGrade[]> => {

    let data = {
        ...payload,
        session_key: token,
    }

    const response = await $axios.post('/company/updateJobGrade', data)

    console.log(response.data.data)
    return response.data.data
}

export const deleteJobGrade = async (token, payload: string) => {

    let data = {
        jobgrade_id: payload,
        session_key: token,
    }

    const response = await $axios.post('/company/deleteJobGrade', data)
    console.log(response.data.data)
    return response.data.data
}

