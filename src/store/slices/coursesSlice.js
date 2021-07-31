import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  disableCourse,
  enableCourse,
  getAllCourses,
} from "../../api/api-courses";
import Status from "../../constants/status-constants";

const initialState = {
  listCourses: {
    entities: [],
    status: {
      status: "",
      message: "",
    },
  },
};

/**
 * send API request for courses
 * @param {*} params
 * @returns
 */
const sendAPIRequest = async (params) => {
  console.log("weofewfoweijfiowefjewoifjewoifj");
  const response = await getAllCourses(params);
  return response.data.data;
};

/**
 * Get all courses thunk middleware
 */
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (params) => await sendAPIRequest(params)
);

export const enableCourseThunk = createAsyncThunk(
  "courses/enableCourse",
  async (id) => {
    const res = await enableCourse(id);
    return id;
  }
);

export const disableCourseThunk = createAsyncThunk(
  "courses/disableCourse",
  async (id) => {
    const res = await disableCourse(id);
    return id;
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all courses
      .addCase(fetchCourses.pending, (state, action) => {
        state.listCourses.status.status = Status.LOADING_STATUS;
        state.listCourses.status.message = "Fetching all courses!";
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.listCourses.status.status = Status.SUCCESS_STATUS;
        state.listCourses.message = "Get all course successfuly!";
        state.listCourses.entities = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.listCourses.status.status = Status.FAILED_STATUS;
        state.listCourses.status.message = action.error.message;
      })
      // Disable & enable course
      .addCase(disableCourseThunk.pending, (state, action) => {
        state.listCourses.status.status = Status.LOADING_STATUS;
      })
      .addCase(disableCourseThunk.fulfilled, (state, action) => {
        state.listCourses.status.status = Status.SUCCESS_STATUS;
        const index = state.listCourses.entities.findIndex(
          (value) => value.course_id === action.payload
        );
        state.listCourses.entities[index].state = "DISABLED";
      })
      .addCase(disableCourseThunk.rejected, (state, action) => {
        state.listCourses.status.status = Status.FAILED_STATUS;
        state.listCourses.status.message = action.error.message;
      })
      //
      .addCase(enableCourseThunk.pending, (state, action) => {
        state.listCourses.status.status = Status.LOADING_STATUS;
      })
      .addCase(enableCourseThunk.fulfilled, (state, action) => {
        state.listCourses.status.status = Status.SUCCESS_STATUS;
        const index = state.listCourses.entities.findIndex(
          (value) => value.course_id === action.payload
        );
        state.listCourses.entities[index].state = "ENABLED";
      })
      .addCase(enableCourseThunk.rejected, (state, action) => {
        state.listCourses.status.status = Status.FAILED_STATUS;
        state.listCourses.status.message = action.error.message;
      });
  },
});

export default courseSlice.reducer;
