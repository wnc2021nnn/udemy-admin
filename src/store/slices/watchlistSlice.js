import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWatchList } from "../../api/api-watchlist";
import Status from "../../constants/status-constants";

const initialState = {
  listCourse: [],
  status: {
    status: "",
    messsage: "",
  },
};

export const fetchWatchlist = createAsyncThunk(
  "watchlist/fetchWatchlist",
  async () => {
    const res = await getWatchList();
    return res.data.data;
  }
);

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWatchlist.pending, (state) => {
        state.status.status = Status.LOADING_STATUS;
      })
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        state.status.status = Status.SUCCESS_STATUS;
        state.listCourse = action.payload;
      })
      .addCase(fetchWatchlist.rejected, (state, action) => {
        state.status.status = Status.FAILED_STATUS;
        state.status.message = action.error.message;
      });
  },
});

export default watchlistSlice.reducer;
