import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createBoard, getBoards } from '../../api/api'

export const fetchBoards = createAsyncThunk('boards/fetchBoards', async (_, { rejectWithValue }) => {
  try {
    const response = await getBoards()
    console.log('Fetched Boards:', response.data)
    return response.data
  } catch (error) {
    console.error('Fetch Boards Error:', error)
    return rejectWithValue(error.response?.data)
  }
})

export const addBoard = createAsyncThunk('boards/addBoard', async (title, { rejectWithValue }) => {
  try {
    const response = await createBoard(title)
    console.log('Added Board:', response.data)
    return response.data
  } catch (error) {
    console.error('Add Board Error:', error)
    return rejectWithValue(error.response?.data)
  }
})

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
        state.loading = true
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.loading = false
        state.boards = action.payload || []
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(addBoard.fulfilled, (state, action) => {
        state.boards.push(action.payload)
      })
  },
})

export default boardSlice.reducer