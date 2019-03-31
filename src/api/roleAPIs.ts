import $axios from "../plugin/axios";
import { Role, RoleFunction, CREATEROLE, UPDATEROLE } from "../interface/roleInterface";
// import { CreateRoleState } from "../scenes/RolePage/create";

export const getRoleList = async (token, payload): Promise<Role[]> => {
    let data = {
        company_id: payload,
        session_key: token,
    }

    const response = await $axios.post('/admin/getRoleList', data)
    console.log(response.data.data)
    return response.data.data
}

export const getRoleFunctionList = async (token): Promise<RoleFunction[]> => {
    let data = {
        session_key: token,
    }

    const response = await $axios.post('/admin/getRoleFunction', data)
    console.log(response.data.data)
    return response.data.data
}

export const createRole = async (token, companyid, payload: CREATEROLE) => {
    console.log(payload)
    let data = {
        ...payload,
        session_key: token,
        company_id: companyid,
    }

    const response = await $axios.post('/admin/createRole', data)
    console.log(response.data.data)
    return response.data.data
}

export const updateRole = async (token, companyid, payload: UPDATEROLE) => {
    console.log(payload)
    let data = {
        ...payload,
        session_key: token,
        company_id: companyid,
    }

    const response = await $axios.post('/admin/updateRole', data)
    console.log(response.data.data)
    return response.data.data
}

export const deleteRole = async (token, payload: string) => {
    console.log(payload)
    let data = {
        role_id: payload,
        session_key: token,
    }

    const response = await $axios.post('/admin/deleteRole', data)
    console.log(response.data.data)
    return response.data.data
}