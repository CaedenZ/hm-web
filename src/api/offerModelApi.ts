import $axios from "../plugin/axios";
import { OfferModel, CREATEOFFERMODELCRED, UPDATEOFFERMODELCRED } from "../interface/offerModelInterface";

export const getOfferModelList = async (payload, id): Promise<OfferModel[]> => {


    const response = await $axios.post('job/getOfferModel', { session_key: payload, jobposition_id: id })
    console.log(response.data.data)
    return response.data.data
}

export const createOfferModel = async (token, payload: CREATEOFFERMODELCRED, companyId: string) => {
    console.log(payload)
    let data = {
        ...payload,
        session_key: token,
        customer_id: companyId
    }

    const response = await $axios.post('/job/createOfferModel', data)
    console.log(response.data.data)
    return response.data.data
}

export const updateOfferModel = async (token, payload: UPDATEOFFERMODELCRED, companyId: string) => {
    console.log(payload)
    let data = {
        ...payload,
        session_key: token,
        company_id: companyId
    }

    const response = await $axios.post('/job/updateOfferModel', data)
    console.log(response.data.data)
    return response.data.data
}

export const deleteOfferModel = async (token, payload: string) => {
    console.log(payload)
    let data = {
        offermodel_id: payload,
        session_key: token,
    }

    console.log(data)
    const response = await $axios.post('job/deleteOfferModel', data)
    return response.data.data
}
