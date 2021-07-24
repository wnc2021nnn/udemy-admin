import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllCourses,
  getMyCourse,
  getRelatedCourses,
} from "../../api/api-courses";
import Status from "../../constants/status-constants";

const LIMIT_ENTITIES = 10;
const MOST_VIEW_COURSES_PARAMS = {
  sort: "view_des",
  limit: LIMIT_ENTITIES,
};

const NEWEST_COURSES_WEEK_PARAMS = {
  sort: "created_date_des",
  limit: LIMIT_ENTITIES,
};

const COURSES_HIGHLIGHTS = {
  sort: "view_from_last_week_des",
  limit: 4,
};

const initialState = {
  listCourses: {
    entities: [],
    status: {
      status: "",
      message: "",
    },
  },
  listMostViewCourses: {
    entities: [],
    status: {
      status: "",
      message: "",
    },
  },
  listNewestCourses: {
    entities: [],
    status: {
      status: "",
      message: "",
    },
  },
  listHighlightCourses: {
    entities: [],
    status: {
      status: "",
      message: "",
    },
  },
  myCourses: {
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

/**
 * Get most view courses thunk mmiddleware
 */
export const fetchMostViewCourses = createAsyncThunk(
  "courses/fetchMostViewCourses",
  async () => await sendAPIRequest(MOST_VIEW_COURSES_PARAMS)
);

/**
 * Get most view courses thunk mmiddleware
 */
export const fetchNewestCourses = createAsyncThunk(
  "courses/fetchNewestCourses",
  async () => await sendAPIRequest(NEWEST_COURSES_WEEK_PARAMS)
);

export const fetchHighlightCourses = createAsyncThunk(
  "courses/fetchHighlightCourses",
  async () => await sendAPIRequest(COURSES_HIGHLIGHTS)
);

export const fetchMyCourses = createAsyncThunk(
  "courses/fetchMyCourses",
  async () => {
    const res = await getMyCourse();
    return res.data.data;
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
      // Get most view courses
      .addCase(fetchMostViewCourses.pending, (state, action) => {
        state.listMostViewCourses.status.status = Status.LOADING_STATUS;
        state.listMostViewCourses.status.message = "Fetching all courses!";
      })
      .addCase(fetchMostViewCourses.fulfilled, (state, action) => {
        state.listMostViewCourses.status.status = Status.SUCCESS_STATUS;
        state.listMostViewCourses.message = "Get all course successfuly!";
        state.listMostViewCourses.entities = action.payload;
      })
      .addCase(fetchMostViewCourses.rejected, (state, action) => {
        state.listMostViewCourses.status.status = Status.FAILED_STATUS;
        state.listMostViewCourses.status.message = action.error.message;
      })
      // Get newest courses
      .addCase(fetchNewestCourses.pending, (state, action) => {
        state.listNewestCourses.status.status = Status.LOADING_STATUS;
        state.listNewestCourses.status.message = "Fetching all courses!";
      })
      .addCase(fetchNewestCourses.fulfilled, (state, action) => {
        state.listNewestCourses.status.status = Status.SUCCESS_STATUS;
        state.listNewestCourses.message = "Get all course successfuly!";
        state.listNewestCourses.entities = action.payload;
      })
      .addCase(fetchNewestCourses.rejected, (state, action) => {
        state.listNewestCourses.status.status = Status.FAILED_STATUS;
        state.listNewestCourses.status.message = action.error.message;
      })
      // Get highlight couses last week
      .addCase(fetchHighlightCourses.pending, (state, action) => {
        state.listHighlightCourses.status.status = Status.LOADING_STATUS;
        state.listHighlightCourses.status.message = "Fetching all courses!";
      })
      .addCase(fetchHighlightCourses.fulfilled, (state, action) => {
        state.listHighlightCourses.status.status = Status.SUCCESS_STATUS;
        state.listHighlightCourses.message = "Get all course successfuly!";
        state.listHighlightCourses.entities = action.payload;
      })
      .addCase(fetchHighlightCourses.rejected, (state, action) => {
        state.listHighlightCourses.status.status = Status.FAILED_STATUS;
        state.listHighlightCourses.status.message = action.error.message;
      })
      // Get my couses
      .addCase(fetchMyCourses.pending, (state, action) => {
        state.myCourses.status.status = Status.LOADING_STATUS;
        state.myCourses.status.message = "Fetching all courses!";
      })
      .addCase(fetchMyCourses.fulfilled, (state, action) => {
        state.myCourses.status.status = Status.SUCCESS_STATUS;
        state.myCourses.message = "Get all course successfuly!";
        state.myCourses.entities = action.payload;
      })
      .addCase(fetchMyCourses.rejected, (state, action) => {
        state.myCourses.status.status = Status.FAILED_STATUS;
        state.myCourses.status.message = action.error.message;
      });
  },
});

export default courseSlice.reducer;
