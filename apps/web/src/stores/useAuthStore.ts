import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  tenantId: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  tenantId: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, accessToken: string, refreshToken: string) => void;
  setAccessToken: (token: string) => void;
  setTenantId: (tenantId: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      tenantId: null,
      isAuthenticated: false,
      setAuth: (user, accessToken, refreshToken) =>
        set({ user, accessToken, refreshToken, tenantId: user.tenantId, isAuthenticated: true }),
      setAccessToken: (token) => set({ accessToken: token }),
      setTenantId: (tenantId) => set({ tenantId }),
      logout: () => set({ user: null, accessToken: null, refreshToken: null, tenantId: null, isAuthenticated: false }),
      bypassLogin: (roleName: string, scopeId: string) => set({
        isAuthenticated: true,
        accessToken: 'mock-dev-token',
        tenantId: 'dev-tenant-id',
        user: {
          id: 'dev-user-id',
          email: 'dev@propertyhub360.com',
          firstName: 'Dev',
          lastName: 'User',
          roles: [roleName], // Enforces the vertical role string
          tenantId: 'dev-tenant-id'
        }
      }),
    }),
    {
      name: 'propertyhub-auth-storage',
    }
  )
);
