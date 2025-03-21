import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBoards, createBoard } from '../../api/api';

export const fetchBoards = createAsyncThunk('boards/fetchBoards', async (_, { rejectWithValue }) => {
  try {
    const response = await getBoards();
    console.log('Fetched boards:', response.data);
    return response.data;
  } catch (error) {
    console.error('Fetch boards error:', error.response?.status, error.response?.data || error.message);
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const addBoard = createAsyncThunk('boards/addBoard', async (title, { rejectWithValue }) => {
  try {
    const response = await createBoard(title);
    console.log('Added board:', response.data);
    return response.data;
  } catch (error) {
    console.error('Add board error:', error.response?.status, error.response?.data || error.message);
    return rejectWithValue(error.response?.data || error.message);
  }
});

const boardSlice = createSlice({
  name: 'boards',
  initialState: {
    boards: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.loading = false;
        state.boards = action.payload || [];
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.boards.push(action.payload);
      })
      .addCase(addBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default boardSlice.reducer;