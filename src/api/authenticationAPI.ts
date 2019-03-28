import $axios from "../plugin/axios";

export const login = async (payload) => {

    console.log(payload)
    const response = await $axios.post('/user/login', payload)
    return response.data.data.session_key
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