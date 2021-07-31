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
    categories: [{ title: category }],
  };
  return await axiosInstance.put(APIPath.CREATE_CATEGORY, body);
};

export const deleteCategory = async (categoryId) => {
  const axiosInstance = AxiosInstance();
  const body = {
    category_ids: [categoryId],
  };
  return await axiosInstance.delete(APIPath.DELETE_CATEGORY, { data: body });
};

export const updateCategory = async (category) => {
  const axiosInstance = AxiosInstance();
  const body = {
    categories: [category],
  };
  return await axiosInstance.patch(APIPath.UPDATE_CATEGORY, body);
};

export const addTopic = async (newTopic) => {
  const axiosInstance = AxiosInstance();
  const body = {
    topics: [newTopic],
  };
  return await axiosInstance.put(APIPath.CREATE_TOPIC, body);
};

export const updateTopic = async (updateTopic) => {
  const axiosInstance = AxiosInstance();
  const body = {
    topics: [updateTopic],
  };
  return await axiosInstance.patch(APIPath.CREATE_TOPIC, body);
};

export const deleteTopic = async (topicId) => {
  const axiosInstance = AxiosInstance();
  const body = {
    topic_ids: [topicId],
  };
  return await axiosInstance.delete(APIPath.DELETE_TOPIC, { data: body });
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
