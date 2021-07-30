import APIPath from "../constants/api-constants/api-path";
import AxiosInstance from "./config/api-config";

/**
 * Get categories
 * @returns response
 */
export const getAllCategories = async () => {
  const axiosIntance = AxiosInstance();
  const res = await axiosIntance.get(APIPath.GET_ALL_CATEGORIES);
  return res;
};

export const addCategory = async (category) => {
  const axiosInstance = AxiosInstance();
  const body = {
    catagories: [category],
  };
  return await axiosInstance.put(APIPath.CREATE_CATEGORY, body);
};

export const deleteCategory = async (id) => {
  const axiosInstance = AxiosInstance();
  const body = {
    category_ids: [id],
  };
  return await axiosInstance.delete(APIPath.DELETE_CATEGORY, body);
};

/**
 * Get topics
 * @param {Object} params
 * @param {string} params.category
 * @param {string} params.sort register_des
 * @returns response
 */
export const getTopics = async (params) => {
  const axiosIntance = AxiosInstance();
  const res = await axiosIntance.get(APIPath.GET_TOPICS, { params: params });
  return res;
};
