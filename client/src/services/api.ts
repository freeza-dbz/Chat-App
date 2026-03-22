import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 5000, // 5 second timeout for detecting unavailable backend
});

// Add token to headers if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log network errors but don't throw - let caller handle
    if (error.message === 'Network Error' || error.code === 'ECONNABORTED') {
      console.log('Backend unavailable - using demo mode');
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  register: (email: string, password: string, username: string) =>
    api.post('/api/auth/register', { email, password, username }),
  login: (email: string, password: string) =>
    api.post('/api/auth/login', { email, password }),
};

// Users endpoints
export const usersAPI = {
  getUsers: () => api.get('/api/users'),
  getUser: (userId: string) => api.get(`/api/users/${userId}`),
};

// Conversations endpoints
export const conversationsAPI = {
  getConversations: () => api.get('/api/conversations'),
  createConversation: (userId: string) =>
    api.post('/api/conversations', { userId }),
};

// Messages endpoints
export const messagesAPI = {
  getMessages: (conversationId: string) =>
    api.get(`/api/messages/${conversationId}`),
  sendMessage: (conversationId: string, text: string) =>
    api.post('/api/messages', { conversationId, text }),
};

export default api;
