import { apiClient } from '@/shared/api/client';

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface AuthTokensResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const authApi = {
  register: (data: RegisterPayload) =>
    apiClient<AuthUser>('/auth/register', { method: 'POST', body: JSON.stringify(data) }),

  login: (data: LoginPayload) =>
    apiClient<AuthTokensResponse>('/auth/login', { method: 'POST', body: JSON.stringify(data) }),

  refresh: (refreshToken: string) =>
    apiClient<AuthTokensResponse>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    }),

  logout: (refreshToken: string, accessToken: string) =>
    apiClient<void>('/auth/logout', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
      token: accessToken,
    }),

  me: (accessToken: string) => apiClient<AuthUser>('/auth/me', { token: accessToken }),

  adminCheck: (accessToken: string) =>
    apiClient<{ message: string; role: string }>('/auth/admin/check', { token: accessToken }),
};
