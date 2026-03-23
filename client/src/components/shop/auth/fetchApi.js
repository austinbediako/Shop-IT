import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const isAuthenticate = () =>
  localStorage.getItem("jwt") ? JSON.parse(localStorage.getItem("jwt")) : false;

export const isAdmin = () => {
  const jwtStr = localStorage.getItem("jwt");
  if (!jwtStr) return false;
  try {
    const parsed = JSON.parse(jwtStr);
    return Number(parsed.user.role) === 1;
  } catch (e) {
    return false;
  }
};

export const loginReq = async ({ email, password }) => {
  const data = { email, password };
  try {
    let res = await axios.post(`${apiURL}/api/signin`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const signupReq = async ({ name, email, password, cPassword }) => {
  const data = { name, email, password, cPassword };
  try {
    let res = await axios.post(`${apiURL}/api/signup`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const forgotPasswordReq = async ({ email }) => {
  const data = { email };
  try {
    let res = await axios.post(`${apiURL}/api/forgot-password`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const resetPasswordReq = async ({ token, newPassword }) => {
  const data = { token, newPassword };
  try {
    let res = await axios.post(`${apiURL}/api/reset-password`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
