import $axios from "../plugin/axios";
import { User } from "../interface/userInterface";
import { CREATEUSERCRED } from "../interface/credInterface";
import { CreateUserState } from "../scenes/UserPage/create";
import { history } from '../store'
import { UpdateUserState } from "../scenes/UserPage/update";

export const getUserList = async (token, payload): Promise<User[]> => {

    let data = {
        company_id: payload,
        session_key: token,
    }
    const response = await $axios.post('/user/', data)
    console.log(response.data.data)
    return response.data.data
}

export const createUser = async (token, payload: CreateUserState, companyid): Promise<User[]> => {

    let data = {
        ...payload,
        company_id: companyid,
        session_key: token,
    }

    const response = await $axios.post('/user/createUser', data)

    console.log(response.data.data)
    return response.data.data
}

export const getUser = async (token, payload: string): Promise<User> => {

    let data = {
        email: payload,
        session_key: token,
    }

    const response = await $axios.post('/user/profile', data)

    console.log(response.data.data)
    return response.data.data
}

export const updateUser = async (token, payload: UpdateUserState): Promise<User[]> => {

    let data = {
        ...payload,
        session_key: token,
    }

    const response = await $axios.post('/user/updateProfile', data)
    console.log(response.data.data)
    return response.data.data
}

export const deleteUser = async (token, payload: string) => {

    let data = {
        email: payload,
        session_key: token,
    }

    const response = await $axios.post('/user/delete', data)
    console.log(response.data.data)
    return response.data.data
}

