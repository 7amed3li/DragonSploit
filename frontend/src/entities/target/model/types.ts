export interface Target {
  id: string;
  url: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  organizationId: string;
}

export interface CreateTargetDto {
  name: string;
  url: string;
  organizationId: string;
}
