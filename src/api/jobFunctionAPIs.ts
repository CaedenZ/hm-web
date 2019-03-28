import $axios from "../plugin/axios";
import { JobFunction } from "../interface/jobfunctionInterface";
import { CreateJobFunctionState } from "../scenes/JobFunctionPage/create";
import { CreateSubJobFunctionState } from "../scenes/JobFunctionPage/createsub";

export const getJobFunctionList = async (payload): Promise<JobFunction[]> => {

    console.log(payload)
    const response = await $axios.post('/admin/jobFuncList', { session_key: payload })
    console.log(response.data.data)
    return response.data.data
}

export const createJobFunction = async (token, payload: CreateJobFunctionState): Promise<JobFunction[]> => {

    let data = {
        ...payload,
        session_key: token,
    }

    const response = await $axios.post('/admin/createJobFunc', data)
    console.log(response.data.data)
    return response.data.data
}

export const createSubJobFunction = async (token, payload: CreateSubJobFunctionState): Promise<JobFunction[]> => {
    console.log(payload)
    let data = {
        ...payload,
        session_key: token,
    }

    const response = await $axios.post('/admin/createSjobFunc', data)
    console.log(response.data.data)
    return response.data.data
}


export const deleteJobFunction = async (token, payload: string): Promise<any> => {

    let data = {
        jobfunction_id: payload,
        session_key: token,
    }

    const response = await $axios.post('/admin/createJobFunc', data)
    console.log(response.data.data)
    return response.data.data
}

export const deleteSubJobFunction = async (token, payload: string): Promise<any> => {
    console.log(payload)
    let data = {
        sjobfunction_id: payload,
        session_key: token,
    }

    const response = await $axios.post('/admin/createSjobFunc', data)
    console.log(response.data.data)
    return response.data.data
}

