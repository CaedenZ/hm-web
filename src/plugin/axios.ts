import Axios from "axios";
import { history, store } from "../store";
import { logoutAction } from "../actions/authenticationAction";

const $axios = Axios.create({
  baseURL: "https://fwnm24zinh.execute-api.ap-southeast-1.amazonaws.com/v1"
  /* other custom settings */
});
$axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    const status = response.status;
    if (status === 405) {
      response.data = null;
      history.push("/");
    } else if (status === 401) {
      store.dispatch(logoutAction());
      history.push("/login");
    }
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default $axios;
