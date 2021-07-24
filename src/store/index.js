import { configureStore } from "@reduxjs/toolkit";
import coursesSlice from "./slices/coursesSlice";
import categoriesSlice from "./slices/categoriesSlice";
import userSlice from "./slices/userSlice";
import statusSlice from "./slices/statusSlice";
import watchlistSlice from "./slices/watchlistSlice";

const store = configureStore({
  reducer: {
    courses: coursesSlice,
    categories: categoriesSlice,
    user: userSlice,
    status: statusSlice,
    watchlist: watchlistSlice,
  },
});

export default store;
