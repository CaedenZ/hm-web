import $axios from "../plugin/axios";
import { Country, Currency, Industry, Sector } from "../interface/countryInterface";

export const getCountryList = async (payload): Promise<Country[]> => {

    console.log(payload)
    const response = await $axios.post('/company/getCountryList', { session_key: payload })
    return response.data.data
}

export const getCurrencyList = async (payload): Promise<Currency[]> => {

    console.log(payload)
    const response = await $axios.post('/company/getCurrency', { session_key: payload })
    return response.data.data
}

export const getIndustryList = async (payload): Promise<Industry[]> => {

    console.log(payload)
    const response = await $axios.post('/company/getIndustry', { session_key: payload })
    return response.data.data
}

export const getSectorList = async (payload): Promise<Sector[]> => {

    console.log(payload)
    const response = await $axios.post('/company/getSector', { session_key: payload })
    return response.data.data
}

