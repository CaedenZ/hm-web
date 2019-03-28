import $axios from "../plugin/axios";
import { User } from "../interface/userInterface";
import { CREATEUSERCRED } from "../interface/credInterface";
import { CreateUserState } from "../scenes/UserPage/create";

export const getUserList = async (payload): Promise<User[]> => {


    const response = await $axios.post('/user/', { session_key: payload })
    console.log(response.data.data)
    return response.data.data
}

export const createUser = async (token, payload: CreateUserState): Promise<User[]> => {

    let data = {
        ...payload,
        session_key: token,
    }

    const response = await $axios.post('/user/create_user', data)
    console.log(response.data.data)
    return response.data.data
}

