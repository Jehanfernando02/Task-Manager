import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser } from '../../api/api';

export const login = createAsyncThunk('auth/login', async (idToken, { rejectWithValue }) => {
  try {
    const response = await loginUser(idToken);
    console.log('Auth Slice: Login response', response.data);
    return response.data;
  } catch (error) {
    console.error('Auth Slice: Login error', error);
    return rejectWithValue(error.response?.data || error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.meta.arg;
        localStorage.setItem('token', action.meta.arg);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;