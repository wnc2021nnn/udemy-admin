import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Status from "../../constants/status-constants";
import {
  getAllCategories,
  getTopics,
  addCategory,
  deleteCategory,
  updateCategory,
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
  async (category) => {
    const res = await addCategory(category);
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
  async (category) => {
    const res = await updateCategory(category);
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
        const updatedCategory = action.payload[0];
        const updatedIndex = state.listCategory.entities.findIndex(
          (value) => value.category_id === updatedCategory.category_id
        );
        state.listCategory.entities[updatedIndex] = updatedCategory;
      });
  },
});

export default categoriesSlice.reducer;
