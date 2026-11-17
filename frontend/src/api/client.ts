import axios, { AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Support HttpOnly cookie authentication
});

// Request interceptor to attach JWT token if present in memory/session
apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('sakthi_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for unified error formatting and 401 handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; errorCode?: string; errors?: Record<string, string> }>) => {
    if (error.response?.status === 401) {
      // Clear local session if unauthorized
      sessionStorage.removeItem('sakthi_auth_token');
      sessionStorage.removeItem('sakthi_user');
      if (window.location.pathname.startsWith('/customer') ||
          window.location.pathname.startsWith('/company') ||
          window.location.pathname.startsWith('/admin')) {
        window.location.href = '/login?session_expired=true';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
