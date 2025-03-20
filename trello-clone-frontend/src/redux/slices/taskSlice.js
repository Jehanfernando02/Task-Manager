import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createTask, getTasksByBoard, updateTask } from '../../api/api';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (boardId) => {
  const response = await getTasksByBoard(boardId);
  return response.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async ({ title, boardId, listId }) => {
  const response = await createTask(title, boardId, listId);
  return response.data;
});

export const updateTaskPosition = createAsyncThunk(
  'tasks/updateTask',
  async ({ taskId, data }) => {
    const response = await updateTask(taskId, data);
    return response.data;
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTaskPosition.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task._id === action.payload._id);
        state.tasks[index] = action.payload;
      });
  },
});

export default taskSlice.reducer;