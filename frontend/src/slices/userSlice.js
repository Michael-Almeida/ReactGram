import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";

const initialState = {
  User: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

// get user details
export const profile = createAsyncThunk(
  "users/profile",
  async (User, thunkAPI) => {
    const token = thunkAPI.getState().auth.User.token;

    const data = await userService.profile(User, token);

    return data;
  }
);

// update user details
export const updateProfile = createAsyncThunk(
  "user/update",
  async (user, thunkAPI) => {
    const token = thunkAPI.getState().auth.User.token;

    const data = await userService.updateProfile(user, token);
    console.log("🚀 ~ data:", data);

    // checl of errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(profile.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.User = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.User = action.payload;
        state.message = "Usuário atualizado com sucesso";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.User = {};
      });
  },
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;
