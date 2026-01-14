import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('dragonsploit-auth-token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Session Recovery: Clear corrupted auth data on persistent 403
    if (error.response?.status === 403) {
      const authStorage = localStorage.getItem('dragonsploit-auth-storage');
      if (authStorage) {
        try {
          const parsed = JSON.parse(authStorage);
          // If we have a user but getting 403, the organizationId might be stale
          if (parsed.state?.user?.organizationId) {
            console.warn('🔴 SECURITY :: Stale session detected. Clearing auth storage.');
            localStorage.removeItem('dragonsploit-auth-storage');
            localStorage.removeItem('dragonsploit-auth-token');
            window.location.href = '/login';
          }
        } catch (e) {
          // Corrupted storage, clear it
          localStorage.removeItem('token');
      localStorage.removeItem('user');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);
