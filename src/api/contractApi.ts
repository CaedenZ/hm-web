import $axios from "../plugin/axios";
import { Contract, CREATECONTRACTCRED, UPDATECONTRACTCRED } from "../interface/contractInterface";

export const getContractList = async (payload, id): Promise<Contract[]> => {


    const response = await $axios.post('job/getContract', { session_key: payload, jobposition_id: id })
    console.log(response.data.data)
    return response.data.data
}

export const createContract = async (token, payload: CREATECONTRACTCRED, companyId: string) => {
    console.log(payload)
    let data = {
        ...payload,
        session_key: token,
        offermodel_id: companyId
    }

    const response = await $axios.post('/job/createContract', data)
    console.log(response.data.data)
    return response.data.data
}

export const updateContract = async (token, payload: UPDATECONTRACTCRED, companyId: string) => {
    console.log(payload)
    let data = {
        ...payload,
        session_key: token,
        offermodel_id: companyId
    }

    const response = await $axios.post('/job/updateContract', data)
    console.log(response.data.data)
    return response.data.data
}

export const deleteContract = async (token, payload: string) => {
    console.log(payload)
    let data = {
        contract_id: payload,
        session_key: token,
    }

    console.log(data)
    const response = await $axios.post('job/deleteContract', data)
    return response.data.data
}
