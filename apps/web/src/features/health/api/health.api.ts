import { apiClient } from '@/shared/api/client';

export interface HealthStatus {
  status: string;
  info?: Record<string, { status: string }>;
  details?: Record<string, { status: string }>;
}

export interface LiveStatus {
  status: string;
  timestamp: string;
}

export interface ReadyStatus {
  status: string;
  database: string;
  timestamp: string;
}

export const healthApi = {
  check: () => apiClient<HealthStatus>('/health'),
  live: () => apiClient<LiveStatus>('/health/live'),
  ready: () => apiClient<ReadyStatus>('/health/ready'),
};
