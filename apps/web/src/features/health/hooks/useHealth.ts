'use client';

import { useQuery } from '@tanstack/react-query';
import { healthApi } from '../api/health.api';

export function useHealthCheck() {
  return useQuery({
    queryKey: ['health'],
    queryFn: () => healthApi.check(),
    refetchInterval: 30_000,
    retry: 1,
  });
}

export function useHealthLive() {
  return useQuery({
    queryKey: ['health', 'live'],
    queryFn: () => healthApi.live(),
    refetchInterval: 10_000,
  });
}

export function useHealthReady() {
  return useQuery({
    queryKey: ['health', 'ready'],
    queryFn: () => healthApi.ready(),
    refetchInterval: 15_000,
  });
}
