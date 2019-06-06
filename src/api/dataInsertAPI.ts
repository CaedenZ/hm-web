import $axios from "../plugin/axios";

export const insertData = async (token, payload, companyId: string) => {
    let data = {
        ...payload,
        session_key: token,
        company_id: companyId
    }

    const response = await $axios.post('/company/insertData', data)
    console.log(response.data.data)
    return response.data.data
}