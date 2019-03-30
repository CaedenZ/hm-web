import $axios from "../plugin/axios";
import { Region } from "../interface/regionInterface";
import { CreateRegionState } from "../scenes/RegionPage/create";

export const getRegionList = async (payload, id): Promise<Region[]> => {


    const response = await $axios.post('/company/getCompanyRegionList', { session_key: payload, company_id: id })
    console.log(response.data.data)
    return response.data.data
}

export const createRegion = async (token, payload: CreateRegionState) => {
    console.log(payload)
    let data = {
        ...payload,
        session_key: token,
    }

    const response = await $axios.post('/company/createCompanyRegion', data)
    console.log(response.data.data)
    return response.data.data
}