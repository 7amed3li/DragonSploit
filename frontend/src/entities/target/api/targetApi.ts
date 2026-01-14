import { apiClient } from '@/shared/api/client';
import type { Target, CreateTargetDto } from '../model/types';

export const targetApi = {
  list: async (organizationId: string): Promise<Target[]> => {
    const { data } = await apiClient.get<Target[]>(`/targets`, {
      params: { organizationId }
    });
    return data;
  },

  create: async (payload: CreateTargetDto): Promise<Target> => {
    const { data } = await apiClient.post<Target>('/targets', payload);
    return data;
  },

  getOne: async (id: string): Promise<Target> => {
    const { data } = await apiClient.get<Target>(`/targets/${id}`);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/targets/${id}`);
  }
};
