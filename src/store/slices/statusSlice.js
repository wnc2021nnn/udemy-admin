import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  message: "",
};

const statusSlice = createSlice({
  name: "status",
  initialState: initialState,
  reducers: {
    setStatus(state, { payload }) {
      return {
        status: payload.status,
        message: payload.message,
      };
    },
  },
});

export const { setStatus } = statusSlice.actions;

export default statusSlice.reducer;
