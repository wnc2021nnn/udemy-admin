import AxiosInstance from "./config/api-config";
import APIPath from "../constants/api-constants/api-path";

/**
 *
 * @param {Object} params
 * @param params.sort
 * @param params.limit
 * @param params.search
 * @param params.topic
 * @returns get courses response
 */
export const getAllCourses = async (params) => {
  const axiosInstance = AxiosInstance();
  return await axiosInstance.get(APIPath.GET_ALL_COURSES, {
    params: params,
  });
};

export const disableCourse = async (id) => {
  const axiosInstance = AxiosInstance();
  const apiPath = `/courses/${id}/state`;
  const body = {
    state: "DISABLED",
  };
  return await axiosInstance.patch(apiPath, body);
};

export const enableCourse = async (id) => {
  const axiosInstance = AxiosInstance();
  const apiPath = `/courses/${id}/state`;
  const body = {
    state: "ENABLED",
  };
  return await axiosInstance.patch(apiPath, body);
};
