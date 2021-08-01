import AxiosInstance from "./config/api-config";
import APIPath from "../constants/api-constants/api-path";

/**
 * Register
 * @param {Object} body
 * @param {string} body.email
 * @param {string} body.password
 * @param {string} body.first_name
 * @param {string} body.last_name
 * @param {number} body.role
 * @returns response
 */
export const register = async (body) => {
  const axiosIntance = AxiosInstance();
  const res = await axiosIntance.put(APIPath.USERS, body);
  return res;
};

/**
 * Login
 * @param {Object} body
 * @param {string} body.email
 * @param {string} body.password
 * @returns response
 */
export const login = async (body) => {
  const axiosIntance = AxiosInstance();
  const res = await axiosIntance.post(APIPath.LOGIN, body);
  return res;
};

export const getUserById = async (userId) => {
  const axiosIntance = AxiosInstance();
  const res = await axiosIntance.get(`${APIPath.USERS}/${userId}`);
  return res;
};

export const changePassword = async (data) => {
  const axiosIntance = AxiosInstance();
  const res = await axiosIntance.patch(APIPath.USERS, data);
  return res;
};

export const getAllTeacher = async () => {
  const axiosInstance = AxiosInstance();
  return await axiosInstance.get(APIPath.USERS, { params: { role: 1 } });
};

export const createTeacher = async (body) => {
  const axiosInstance = AxiosInstance();
  return await axiosInstance.put(APIPath.CREATE_TEACHER, body);
};

export const getAllStudent = async () => {
  const axiosInstance = AxiosInstance();
  return await axiosInstance.get(APIPath.USERS, { params: { role: 2 } });
};
