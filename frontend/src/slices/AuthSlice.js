import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

const User = JSON.parse(localStorage.getItem("User"));

const initialState = {
  User: User ? User : null,
  error: false,
  sucess: false,
  loading: false,
};

// Register an User and Sign In
export const register = createAsyncThunk(
  "auth/register",
  async (User, thunkAPI) => {
    const data = await authService.register(User);

    // check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// Logout an User
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.sucess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.sucess = true;
        state.error = null;
        state.User = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.User = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.sucess = true;
        state.error = null;
        state.User = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
