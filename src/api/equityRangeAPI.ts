import $axios from "../plugin/axios";
import { EquityRange, CREATEEQUITYRANGECRED, UPDATEEQUITYRANGECRED } from "../interface/equityRangeInterface";

export const getEquityRangeList = async (token, payload): Promise<EquityRange[]> => {

    let data = {
        lti_id: payload,
        session_key: token,
    }
    const response = await $axios.post('/company/getEquityRange', data)
    console.log(response.data.data)
    return response.data.data
}

export const createEquityRange = async (token, payload: CREATEEQUITYRANGECRED, ltiid): Promise<EquityRange[]> => {

    let data = {
        ...payload,
        lti_id: ltiid,
        session_key: token,
    }

    const response = await $axios.post('/company/createEquityRange', data)

    console.log(response.data.data)
    return response.data.data
}

export const updateEquityRange = async (token, payload: UPDATEEQUITYRANGECRED): Promise<EquityRange[]> => {

    let data = {
        ...payload,
        session_key: token,
    }

    const response = await $axios.post('/company/updateEquityRange', data)

    console.log(response.data.data)
    return response.data.data
}

export const deleteEquityRange = async (token, payload: string) => {

    let data = {
        equityrange_id: payload,
        session_key: token,
    }

    const response = await $axios.post('/company/deleteEquityRange', data)
    console.log(response.data.data)
    return response.data.data
}

