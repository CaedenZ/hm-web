import $axios from "../plugin/axios";
import { JobPosition, CREATEJOBPOSITIONCRED, UPDATEJOBPOSITIONCRED } from "../interface/jobpositionInterface";

export const getJobPositionList = async (payload, id): Promise<JobPosition[]> => {


    const response = await $axios.post('job/getjob', { session_key: payload, customer_id: id })
    console.log(response.data.data)
    return response.data.data
}

export const createJobPosition = async (token, payload: CREATEJOBPOSITIONCRED, companyId: string) => {
    console.log(payload)
    let data = {
        ...payload,
        session_key: token,
        customer_id: companyId
    }

    const response = await $axios.post('/job/createjob', data)
    console.log(response.data.data)
    return response.data.data
}

export const updateJobPosition = async (token, payload: UPDATEJOBPOSITIONCRED, companyId: string) => {
    console.log(payload)
    let data = {
        ...payload,
        session_key: token,
        company_id: companyId
    }

    const response = await $axios.post('/job/updatejob', data)
    console.log(response.data.data)
    return response.data.data
}

export const deleteJobPosition = async (token, payload: string) => {
    console.log(payload)
    let data = {
        jobposition_id: payload,
        session_key: token,
    }

    console.log(data)
    const response = await $axios.post('job/deletejob', data)
    return response.data.data
}
