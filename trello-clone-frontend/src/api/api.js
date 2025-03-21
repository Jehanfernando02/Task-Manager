import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Sending request with token:', token.substring(0, 10) + '...');
  } else {
    console.log('No token found for request:', config.method, config.url);
  }
  return config;
}, (error) => {
  console.error('Request interceptor error:', error);
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const loginUser = (idToken) => api.post('/auth/login', { idToken });
export const getBoards = () => api.get('/boards');
export const createBoard = (title) => api.post('/boards', { title });
export const createList = (title, boardId) => api.post('/lists', { title, boardId });
export const createTask = (title, boardId, listId) =>
  api.post('/tasks', { title, boardId, listId });
export const getTasksByBoard = (boardId) => api.get(`/tasks/board/${boardId}`);
export const updateTask = (taskId, data) => api.put(`/tasks/${taskId}`, data);

export default api;