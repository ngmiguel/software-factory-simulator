'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi, type AuthUser } from '../api/auth.api';

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  fetchMe: () => Promise<void>;
  setTokens: (access: string, refresh: string, user: AuthUser) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,

      setTokens: (access, refresh, user) =>
        set({ accessToken: access, refreshToken: refresh, user, isAuthenticated: true }),

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const res = await authApi.login({ email, password });
          set({
            user: res.user,
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
            isAuthenticated: true,
          });
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (data) => {
        set({ isLoading: true });
        try {
          await authApi.register(data);
          await get().login(data.email, data.password);
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        const { accessToken, refreshToken } = get();
        if (accessToken && refreshToken) {
          try {
            await authApi.logout(refreshToken, accessToken);
          } catch {
            /* ignore */
          }
        }
        set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
      },

      fetchMe: async () => {
        const { accessToken } = get();
        if (!accessToken) return;
        try {
          const user = await authApi.me(accessToken);
          set({ user, isAuthenticated: true });
        } catch {
          set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
        }
      },
    }),
    { name: 'sfs-auth' },
  ),
);
