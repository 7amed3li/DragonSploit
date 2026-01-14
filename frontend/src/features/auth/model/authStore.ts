import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, AuthState } from '@/entities/user/model/types';

interface AuthActions {
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'dragonsploit-auth-storage',
    }
  )
);
