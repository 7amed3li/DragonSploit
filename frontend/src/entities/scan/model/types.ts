export type ScanStatus = 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'CANCELED';

export interface Scan {
  id: string;
  status: ScanStatus;
  progress?: number; // 🆕 نسبة التقدم (0-100)
  startedAt: string | null;
  completedAt: string | null;
  createdAt: string;
  targetId: string;
  organizationId: string;
  target?: {
    name: string;
    url: string;
  };
}

export interface CreateScanDto {
  targetId: string;
  profile?: 'lightning' | 'balanced' | 'deep';
  configurationId?: string;
}
