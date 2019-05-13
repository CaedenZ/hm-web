import $axios from "../plugin/axios";
import { JobChart, UPDATECELL } from "../interface/jobchartInterface";

export const getJobChartList = async (token, payload): Promise<JobChart[]> => {

    let data = {
        company_id: payload,
        session_key: token,
    }
    const response = await $axios.post('/company/getJobCorrelationChart', data)
    console.log(response.data.data)
    return response.data.data
}

export const updateCell = async (token, payload: UPDATECELL): Promise<JobChart[]> => {

    let data = {
        ...payload,
        session_key: token,
    }

    const response = await $axios.post('/company/updateJCChart', data)

    console.log(response.data.data)
    return response.data.data
}

export const getJobChartByID = async (token, companyID, countryName): Promise<JobChart> => {

    let data = {}
    if (countryName !== '') {
        data = {
            company_id: companyID,
            session_key: token,
            country_name: countryName
        }
    }
    else {
        data = {
            company_id: companyID,
            session_key: token,
        }
    }
    const response = await $axios.post('/company/getJCCbyID', data)
    return response.data.data
}
