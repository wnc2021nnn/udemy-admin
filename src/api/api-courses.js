import AxiosIntance from "./config/api-config";
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
  const axiosIntance = AxiosIntance();
  const res = await axiosIntance.get(APIPath.GET_ALL_COURSES, {
    params: params,
  });
  return res;
};

/**
 * Get related courses
 * @param {string} course_id Course id
 * @param {object} params
 * @param {string} params.sort registes_des
 * @param {string} params.limit limit
 * @returns response
 */
export const getRelatedCourses = async (course_id, params) => {
  const axiosIntance = AxiosIntance();
  const res = await axiosIntance.get(
    `${APIPath.GET_ALL_COURSES}/${course_id}/related-courses`,
    { params: params }
  );
  return res;
};

export const getCourseById = async (course_id) => {
  const axiosIntance = AxiosIntance();
  const res = await axiosIntance.get(`${APIPath.GET_ALL_COURSES}/${course_id}`);
  return res;
};

export const getCourseReviews = async (course_id) => {
  const axiosIntance = AxiosIntance();
  const res = await axiosIntance.get(APIPath.GET_COURSE_REVIEWS, {
    params: { course_id: course_id },
  });
  return res;
};

export const purchasesCourse = async (body) => {
  const axiosIntance = AxiosIntance();
  const res = await axiosIntance.put(APIPath.PURCHASES, body);
  return res;
};

export const getCourseContent = async (course_id) => {
  const axiosIntance = AxiosIntance();
  const res = await axiosIntance.get(
    `${APIPath.GET_ALL_COURSES}/${course_id}${APIPath.GET_COURSE_CONTENT}`
  );
  return res;
};

export const reviewCourse = async (body) => {
  const axiosIntance = AxiosIntance();
  const res = await axiosIntance.put(APIPath.PUT_REVIEW_COURSE, body);
  return res;
};

export const sendLog = async (body) => {
  const axiosIntance = AxiosIntance();
  const res = await axiosIntance.put(APIPath.LOG, body);
  return res;
};

export const getMyCourse = async () => {
  const axiosIntance = AxiosIntance();
  const res = await axiosIntance.get(APIPath.GET_MY_COURSES);
  return res;
};

export const updateStatus = async (lesson_id, body) => {
  const axiosIntance = AxiosIntance();
  const res = await axiosIntance.post(
    `/lessons/${lesson_id}/update-video-learning-state`,
    body
  );
  return res;
};
