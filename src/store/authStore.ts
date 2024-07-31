import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';
import { User } from '../utils/interface';


interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const useAuthPersist = persist<AuthState>(
  (set) => ({
    token: null,
    user: null,
    isAuthenticated: false,

    login: (token: string) => {
      const decoded: User = jwtDecode(token);
      set({
        token: token,
        user: decoded,
        isAuthenticated: true
      });
    },

    logout: () => {
      set({
        token: null,
        user: null,
        isAuthenticated: false
      });
    }
  }),
  {
    name: 'auth-storage',
    getStorage: () => localStorage,
  }
);

export const useAuthStore = create<AuthState>()(useAuthPersist);