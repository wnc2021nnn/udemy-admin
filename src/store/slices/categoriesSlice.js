import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Status from "../../constants/status-constants";
import {
  getAllCategories,
  getTopics,
  addCategory,
  deleteCategory,
  updateCategory,
  addTopic,
  updateTopic,
  deleteTopic,
} from "../../api/api-categories";

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

export const addNewCategoryThunk = createAsyncThunk(
  "categories/addNewCategory",
  async (category, {dispatch}) => {
    const res = await addCategory(category);
    dispatch(fetchCategoriesList());
    return res.data.data;
  }
);

export const deleteCategoryThunk = createAsyncThunk(
  "categories/deleteCategory",
  async (id) => {
    const res = await deleteCategory(id);
    return res.data.data;
  }
);

export const updateCategoryThunk = createAsyncThunk(
  "categories/updateCategory",
  async (category, { dispatch }) => {
    const res = await updateCategory(category);
    dispatch(fetchCategoriesList());
    return res.data.data;
  }
);

export const addNewTopicThunk = createAsyncThunk(
  "topics/addNewTopic",
  async (topic) => {
    const res = await addTopic(topic);
    return res.data.data;
  }
);

export const updateTopicThunk = createAsyncThunk(
  "topics/updateTopic",
  async (topic, { dispatch }) => {
    const res = await updateTopic(topic);
    dispatch(fetchCategoriesList());
    return res.data.data;
  }
);

export const deleteTopicThunk = createAsyncThunk(
  "topics/deleteTopic",
  async (topicId, { dispatch }) => {
    const res = await deleteTopic(topicId);
    dispatch(fetchCategoriesList());
    return res.data.data;
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all category
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

      // Add new category reducers
      .addCase(addNewCategoryThunk.pending, (state, action) => {
        state.listCategory.status.status = Status.LOADING_STATUS;
      })
      .addCase(addNewCategoryThunk.rejected, (state, action) => {
        state.listCategory.status.status = Status.FAILED_STATUS;
        state.listCategory.status.message = action.error.message;
      })
      .addCase(addNewCategoryThunk.fulfilled, (state, action) => {
        state.listCategory.status.status = Status.SUCCESS_STATUS;
        state.listCategory.entities = [
          ...state.listCategory.entities,
          action.payload[0],
        ];
      })

      // Delete category reducers
      .addCase(deleteCategoryThunk.pending, (state, action) => {
        state.listCategory.status.status = Status.LOADING_STATUS;
      })
      .addCase(deleteCategoryThunk.rejected, (state, action) => {
        state.listCategory.status.status = Status.FAILED_STATUS;
        state.listCategory.status.message = action.error.message;
      })
      .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
        state.listCategory.status.status = Status.SUCCESS_STATUS;
        const deleteId = action.payload[0];
        state.listCategory.entities = state.listCategory.entities.filter(
          (value, index) => {
            return value.category_id !== deleteId;
          }
        );
      })

      // Update category reducer
      .addCase(updateCategoryThunk.pending, (state, action) => {
        state.listCategory.status.status = Status.LOADING_STATUS;
      })
      .addCase(updateCategoryThunk.rejected, (state, action) => {
        state.listCategory.status.status = Status.FAILED_STATUS;
        state.listCategory.status.message = action.error.message;
      })
      .addCase(updateCategoryThunk.fulfilled, (state, action) => {
        state.listCategory.status.status = Status.SUCCESS_STATUS;
      })

      // Add topic reducer
      .addCase(addNewTopicThunk.pending, (state, action) => {
        state.listCategory.status.status = Status.LOADING_STATUS;
      })
      .addCase(addNewTopicThunk.rejected, (state, action) => {
        state.listCategory.status.status = Status.FAILED_STATUS;
        state.listCategory.status.message = action.error.message;
      })
      .addCase(addNewTopicThunk.fulfilled, (state, action) => {
        state.listCategory.status.status = Status.SUCCESS_STATUS;
        const newTopic = action.payload[0];
        const updatedIndex = state.listCategory.entities.findIndex(
          (value) => value.category_id === newTopic.category_id
        );
        state.listCategory.entities[updatedIndex].topics = [
          ...state.listCategory.entities[updatedIndex].topics,
          { topic_id: newTopic.topic_id, title: newTopic.title },
        ];
      })

      // Update topic reducer
      .addCase(updateTopicThunk.pending, (state, action) => {
        state.listCategory.status.status = Status.LOADING_STATUS;
      })
      .addCase(updateTopicThunk.rejected, (state, action) => {
        state.listCategory.status.status = Status.FAILED_STATUS;
        state.listCategory.status.message = action.error.message;
      })
      .addCase(updateTopicThunk.fulfilled, (state, action) => {
        state.listCategory.status.status = Status.SUCCESS_STATUS;
      })

      // Delete topic reducer
      .addCase(deleteTopicThunk.pending, (state, action) => {
        state.listCategory.status.status = Status.LOADING_STATUS;
      })
      .addCase(deleteTopicThunk.rejected, (state, action) => {
        state.listCategory.status.status = Status.FAILED_STATUS;
        state.listCategory.status.message = action.error.message;
      })
      .addCase(deleteTopicThunk.fulfilled, (state, action) => {
        state.listCategory.status.status = Status.SUCCESS_STATUS;
      });
  },
});

export default categoriesSlice.reducer;
