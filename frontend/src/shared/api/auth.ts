import { apiClient } from '../api/client';
import type { User } from '@/entities/user/model/types';

export interface LoginResponse {
  accessToken: string;
  user: User;
}

export const authApi = {
  login: (credentials: object) => 
    apiClient.post<LoginResponse>('/auth/login', credentials),
  
  register: (userData: object) =>
    apiClient.post<LoginResponse>('/auth/register', userData),
  
  logout: () => 
    apiClient.post('/auth/logout'),
    
  refresh: () => 
    apiClient.post<{ accessToken: string }>('/auth/refresh'),
};
