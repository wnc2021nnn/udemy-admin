import { Util } from "../../constants/util-constants";

export const verifyEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const verifyPassword = (password) => {
  if (password.includes(" ") || password.length < 6) return false;
  return true;
};

export const getToken = () => {
    return localStorage.getItem(Util.ACCESS_TOKEN);
};

export const getUserId = () => {
  return localStorage.getItem(Util.USER_ID);
};