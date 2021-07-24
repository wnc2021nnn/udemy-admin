import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Status from "../../constants/status-constants";
import { getAllCategories, getTopics } from "../../api/api-categories";

const FETCH_HOT_TOPICS_PARAMS = {
  sort: "register_des",
};
/**
 * Categories Initial state
 */
const initialState = {
  listCategory: {
    entities: [],
    status: {
      status: "",
      message: "",
    },
  },
  listHotTopic: {
    entities: [],
    status: {
      status: "",
      message: "",
    },
  },
};

export const fetchHotTopicList = createAsyncThunk(
  "categories/fetchHotTopicList",
  async () => {
    const res = await getTopics(FETCH_HOT_TOPICS_PARAMS);
    return res.data.data;
  }
);

export const fetchCategoriesList = createAsyncThunk(
  "categories/fetchCategoriesList",
  async () => {
    const res = await getAllCategories();
    return res.data.data;
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesList.pending, (state) => {
        state.listCategory.status.status = Status.LOADING_STATUS;
      })
      .addCase(fetchCategoriesList.fulfilled, (state, action) => {
        state.listCategory.status.status = Status.SUCCESS_STATUS;
        state.listCategory.entities = action.payload;
      })
      .addCase(fetchCategoriesList.rejected, (state, action) => {
        state.listCategory.status.status = Status.FAILED_STATUS;
        state.listCategory.status.message = action.error.message;
      })

      .addCase(fetchHotTopicList.pending, (state) => {
        state.listHotTopic.status.status = Status.LOADING_STATUS;
      })
      .addCase(fetchHotTopicList.fulfilled, (state, action) => {
        state.listHotTopic.status.status = Status.SUCCESS_STATUS;
        state.listHotTopic.entities = action.payload;
      })
      .addCase(fetchHotTopicList.rejected, (state, action) => {
        state.listHotTopic.status.status = Status.FAILED_STATUS;
        state.listHotTopic.status.message = action.error.message;
      });
  },
});

export default categoriesSlice.reducer;
