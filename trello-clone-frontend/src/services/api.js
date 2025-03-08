import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const login = (idToken) => api.post('/auth/login', { idToken });
export const createBoard = (title) => api.post('/boards', { title });
export const getBoards = () => api.get('/boards');
export const createList = (title, boardId) => api.post('/lists', { title, boardId });
export const updateListPosition = (listId, position) => api.put(`/lists/${listId}`, { position });
export const createTask = (title, boardId, listId) => api.post('/tasks', { title, boardId, listId });
export const updateTask = (taskId, data) => api.put(`/tasks/${taskId}`, data);
export const getTasksByBoard = (boardId) => api.get(`/tasks/board/${boardId}`);
export const getUsers = () => api.get('/users');