import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createTeacher,
  disableUser,
  getAllStudent,
  getAllTeacher,
  getUserById,
  login,
  enableUser,
  updateUser,
} from "../../api/user-api";
import Status from "../../constants/status-constants";

const initialState = {
  userInform: {
    user: {
      first_name: "",
      last_name: "",
    },
    status: {
      status: "",
      message: "",
    },
  },
  teachers: {
    users: [],
    status: {
      status: "",
      message: "",
    },
  },
  students: {
    users: [],
    status: {
      status: "",
      message: "",
    },
  },
};

const sendAPIRequest = async (body) => {
  const res = await login(body);
  return res.data.data;
};

export const userLogin = createAsyncThunk("user/userLogin", async (body) => {
  const res = await sendAPIRequest(body);
  return res;
});

export const fetchUserInfor = createAsyncThunk(
  "user/fetchUserInfor",
  async (userId) => {
    const res = await getUserById(userId);
    return res.data.data;
  }
);

export const getAllTeacherThunk = createAsyncThunk(
  "user/getAllTeacher",
  async () => {
    const res = await getAllTeacher();
    return res.data.data;
  }
);

export const getAllStudentThunk = createAsyncThunk(
  "user/getAllStudent",
  async () => {
    const res = await getAllStudent();
    return res.data.data;
  }
);

export const createTeacherThunk = createAsyncThunk(
  "user/createTeacher",
  async (body, { dispatch }) => {
    const res = await createTeacher({ ...body, role: 1 });
    dispatch(getAllTeacherThunk());
    return res.data.data;
  }
);

export const disableTeacherThunk = createAsyncThunk(
  "user/disableTeacher",
  async (id, { dispatch }) => {
    const res = await disableUser(id);
    dispatch(getAllTeacherThunk());
    return res.data.data;
  }
);

export const enableTeacherThunk = createAsyncThunk(
  "user/enableTeacher",
  async (id, { dispatch }) => {
    const res = await enableUser(id);
    dispatch(getAllTeacherThunk());
    return res.data.data;
  }
);

export const updateTeacherThunk = createAsyncThunk(
  "user/updateTeacher",
  async (body, { dispatch }) => {
    const res = await updateUser(body);
    dispatch(getAllStudentThunk());
    return res.data.data;
  }
);

export const disableStudentThunk = createAsyncThunk(
  "user/disableStudent",
  async (id, { dispatch }) => {
    const res = await disableUser(id);
    dispatch(getAllStudentThunk());
    return res.data.data;
  }
);

export const enableStudentThunk = createAsyncThunk(
  "user/enableStudent",
  async (id, { dispatch }) => {
    const res = await enableUser(id);
    dispatch(getAllStudentThunk());
    return res.data.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state, action) => {
        state.userInform.status.status = Status.LOADING_STATUS;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.userInform.status.status = Status.SUCCESS_STATUS;
        state.userInform.user = action.payload;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.userInform.status.status = Status.FAILED_STATUS;
        state.userInform.status.message = action.error.message;
      })
      // Get all teacher reducers
      .addCase(getAllTeacherThunk.pending, (state, action) => {
        state.teachers.status.status = Status.LOADING_STATUS;
      })
      .addCase(getAllTeacherThunk.fulfilled, (state, action) => {
        state.teachers.status.status = Status.SUCCESS_STATUS;
        state.teachers.users = action.payload;
      })
      .addCase(getAllTeacherThunk.rejected, (state, action) => {
        state.teachers.status.status = Status.FAILED_STATUS;
        state.teachers.status.message = action.error.message;
      })
      // Create teacher reducers
      .addCase(createTeacherThunk.pending, (state, action) => {
        state.teachers.status.status = Status.LOADING_STATUS;
      })
      .addCase(createTeacherThunk.fulfilled, (state, action) => {
        state.teachers.status.status = Status.SUCCESS_STATUS;
      })
      .addCase(createTeacherThunk.rejected, (state, action) => {
        state.teachers.status.status = Status.FAILED_STATUS;
        state.teachers.status.message = action.error.message;
      })
      // Get all teacher reducers
      .addCase(getAllStudentThunk.pending, (state, action) => {
        state.students.status.status = Status.LOADING_STATUS;
      })
      .addCase(getAllStudentThunk.fulfilled, (state, action) => {
        state.students.status.status = Status.SUCCESS_STATUS;
        state.students.users = action.payload;
      })
      .addCase(getAllStudentThunk.rejected, (state, action) => {
        state.students.status.status = Status.FAILED_STATUS;
        state.students.status.message = action.error.message;
      })
      // Disable teacher reducers
      .addCase(disableTeacherThunk.pending, (state, action) => {
        state.teachers.status.status = Status.LOADING_STATUS;
      })
      .addCase(disableTeacherThunk.fulfilled, (state, action) => {
        state.teachers.status.status = Status.SUCCESS_STATUS;
      })
      .addCase(disableTeacherThunk.rejected, (state, action) => {
        state.teachers.status.status = Status.FAILED_STATUS;
        state.teachers.status.message = action.error.message;
      })
      // Enable teacher reducers
      .addCase(enableTeacherThunk.pending, (state, action) => {
        state.teachers.status.status = Status.LOADING_STATUS;
      })
      .addCase(enableTeacherThunk.fulfilled, (state, action) => {
        state.teachers.status.status = Status.SUCCESS_STATUS;
      })
      .addCase(enableTeacherThunk.rejected, (state, action) => {
        state.teachers.status.status = Status.FAILED_STATUS;
        state.teachers.status.message = action.error.message;
      });
  },
});

export default userSlice.reducer;
