import $axios from "../plugin/axios";
import { Region } from "../interface/regionInterface";

export const getRegionList = async (payload, id): Promise<Region[]> => {


    const response = await $axios.post('/company/getCompanyRegionList', { session_key: payload, company_id: id })
    console.log(response.data.data)
    return response.data.data
}
