import { apiClient } from '@/shared/api/client';
import type { Scan, CreateScanDto } from '../model/types';

export const scanApi = {
  list: async (organizationId: string): Promise<Scan[]> => {
    const { data } = await apiClient.get<{ data: Scan[] }>(`/scans`, {
      params: { organizationId }
    });
    return data.data;
  },

  create: async (payload: CreateScanDto): Promise<Scan> => {
    const { data } = await apiClient.post<{ data: Scan }>(`/scans`, payload);
    return data.data;
  },

  getOne: async (id: string): Promise<Scan> => {
    const { data } = await apiClient.get<{ data: Scan }>(`/scans/${id}`);
    return data.data;
  },

  // 🆕 إيقاف الفحص
  cancel: async (id: string): Promise<void> => {
    await apiClient.post(`/scans/${id}/cancel`);
  }
};
