import Axios from "axios"

const $axios = Axios.create({
    baseURL: 'https://fwnm24zinh.execute-api.ap-southeast-1.amazonaws.com/v1',
    /* other custom settings */
});

export default $axios;