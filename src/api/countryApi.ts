import $axios from "../plugin/axios";
import { Country } from "../interface/countryInterface";

export const getCountryList = async (payload): Promise<Country[]> => {

    console.log(payload)
    const response = await $axios.post('/company/getCountryList', { session_key: payload })
    return response.data.data
}
