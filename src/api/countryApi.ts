import $axios from "../plugin/axios";
import { Country, Currency, DistintCurrency } from "../interface/countryInterface";

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

export const getDistintCurrencyList = async (payload): Promise<DistintCurrency[]> => {

    console.log(payload)
    const response = await $axios.post('/company/getDistinctCurrency', { session_key: payload })
    return response.data.data
}


