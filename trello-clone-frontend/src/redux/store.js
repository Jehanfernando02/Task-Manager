import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import boardSlice from './slices/boardSlice';
import taskSlice from './slices/taskSlice';

export default configureStore({
  reducer: {
    auth: authSlice,
    boards: boardSlice,
    tasks: taskSlice,
  },
});