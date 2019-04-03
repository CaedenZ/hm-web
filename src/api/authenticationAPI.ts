import $axios from "../plugin/axios";

export const login = async (payload) => {

    console.log(payload)
    const response = await $axios.post('/user/login', payload)
    return response.data.data
}

export const createUser = async (payload) => {

    console.log(payload)
    $axios.post('/user/createUser', payload)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    return 'asd'
}

export const forgetPassword = async (payload) => {

    console.log(payload)
    const response = await $axios.post('/user/forgetPassword', payload)
    return response.data.data
}

export const getUserProfile = async (token, payload) => {
    const data = {
        session_key: token,
        email: payload,
    }
    console.log(payload)
    const response = await $axios.post('/user/profile', data)
    return response.data.data
}