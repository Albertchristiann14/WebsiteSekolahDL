"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { adminApi, AuthStorage, User } from "@/lib/api";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string, user: User) => void;
  logout: () => Promise<void>;
  hasRole: (roles: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: async () => {},
  hasRole: () => false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = AuthStorage.getToken();
      const storedUser = AuthStorage.getUser();

      if (!storedToken) {
        setUser(null);
        setLoading(false);
        if (pathname?.startsWith("/admin") && !pathname?.startsWith("/admin/login")) {
          router.replace("/admin/login");
        }
        return;
      }

      // If we have cached user, set it immediately to prevent UI flash
      if (storedUser) {
        setUser(storedUser);
      }

      // Verify token with backend
      try {
        const res = await adminApi.getMe();
        if (res.status === 200 && res.data) {
          const fetchedUser = res.data?.user || (res.data?.id ? res.data : null);
          if (fetchedUser) {
            setUser(fetchedUser);
            AuthStorage.setUser(fetchedUser);
          } else {
            AuthStorage.clear();
            setUser(null);
            if (pathname?.startsWith("/admin") && !pathname?.startsWith("/admin/login")) {
              router.replace("/admin/login");
            }
          }
        } else {
          AuthStorage.clear();
          setUser(null);
          if (pathname?.startsWith("/admin") && !pathname?.startsWith("/admin/login")) {
            router.replace("/admin/login");
          }
        }
      } catch {
        // If offline or error, keep cached user if present
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [pathname, router]);

  const login = (token: string, newUser: User) => {
    AuthStorage.setToken(token);
    AuthStorage.setUser(newUser);
    setUser(newUser);
    router.replace("/admin");
  };

  const logout = async () => {
    try {
      await adminApi.logout();
    } catch {
      // Ignore network errors during logout
    } finally {
      AuthStorage.clear();
      setUser(null);
      router.replace("/admin/login");
    }
  };

  const hasRole = (allowedRoles: string[]) => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

