import $axios from "../plugin/axios";

export const login = async payload => {
  console.log(payload);
  const response = await $axios.post("/user/login", payload);
  return response.data.data;
};

export const createUser = async payload => {
  console.log(payload);
  $axios
    .post("/user/createUser", payload)
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
  return "asd";
};

export const forgetPassword = async payload => {
  console.log(payload);
  const response = await $axios.post("/user/forgetPassword", payload);
  return response.data.data;
};

export const updatePassword = async (token, email, payload) => {
  const data = {
    session_key: token,
    email: email,
    password: payload
  };
  console.log(data);
  const response = await $axios.post("/user/updatePassword", data);
  return response.data.data;
};

export const getUserProfile = async (token, payload) => {
  const data = {
    session_key: token,
    email: payload
  };
  console.dir(data);
  console.log(payload);
  const response = await $axios.post("/user/profile", data);
  return response.data.data;
};

export const updateUserProfile = async (token, payload) => {
  const data = {
    ...payload,
    session_key: token
  };
  const response = await $axios.post("/user/updateProfile", data);
  return response.data.data;
};
