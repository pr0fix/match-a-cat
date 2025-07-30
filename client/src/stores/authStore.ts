import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../utils/types";
import auth from "../services/auth";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;

  signup: (username: string, name: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,

      signup: async (username, name, password) => {
        set({ isLoading: true, error: null });
        try {
          const user = await auth.signup({ username, name, password });
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error: unknown) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "An unknown error occurred";
          set({ error: errorMessage, isLoading: false });
        }
      },

      login: async (username, password) => {
        set({ isLoading: true, error: null });
        try {
          const user = await auth.login({ username, password });
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "An unknown error occurred";
          set({ error: errorMessage, isLoading: false });
        }
      },

      logout: () => {
        try {
          auth.logout();
          set({ user: null, isAuthenticated: false });
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "An unknown error occurred";
          set({ error: errorMessage, isLoading: false });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
