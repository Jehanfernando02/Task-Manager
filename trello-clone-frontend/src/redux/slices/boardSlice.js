import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBoards, createBoard } from '../../api/api';

export const fetchBoards = createAsyncThunk('boards/fetchBoards', async () => {
  const response = await getBoards();
  return response.data;
});

export const addBoard = createAsyncThunk('boards/addBoard', async (title) => {
  const response = await createBoard(title);
  return response.data;
});

const boardSlice = createSlice({
  name: 'boards',
  initialState: {
    boards: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.loading = false;
        state.boards = action.payload;
      })
      .addCase(addBoard.fulfilled, (state, action) => {
        state.boards.push(action.payload);
      });
  },
});

export default boardSlice.reducer;