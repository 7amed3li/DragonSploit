export type ScanStatus = 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'STOPPED';

export interface Scan {
  id: string;
  status: ScanStatus;
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
