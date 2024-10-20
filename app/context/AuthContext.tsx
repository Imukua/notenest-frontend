"use client";

import { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import TokenStore from '@/lib/auth/tokenstore';
import { ApiMethod, UserType, ContextType } from '@/lib/types/types';
import { useApi } from '@/hooks/useApi';
import { Routes } from '@/lib/routes/routes';
import Loading from '@/components/loading/loading';

const { sendRequest } = useApi();

const AuthContext = createContext<ContextType>({
  isAuthenticated: false,
  loginUser: async () => {},
  logoutUser: () => {},
  accessToken: null,
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = TokenStore.getAccessToken();

    if (token) {
      try {
        const decodedUser = jwtDecode<UserType>(token);
        const currentTime = Math.floor(Date.now() / 1000);
        
        if (decodedUser.exp > currentTime) {
          setUser(decodedUser);
          setAccessToken(token);
          setIsAuthenticated(true);
        } else {
          TokenStore.removeAccessToken();
        }
      } catch {
        TokenStore.removeAccessToken();
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/login'); 
      }
    }
  }, [loading, isAuthenticated, router]);

  const loginUser = async (username: string, password: string) => {
    setLoading(true);
    try {
      const { data, status } = await sendRequest(ApiMethod.POST, Routes.auth.login, { username, password });

      if (status === 200) {
        TokenStore.setAccessToken(data.accessToken);
        TokenStore.setRefreshToken(data.refreshToken);
        setAccessToken(data.accessToken);
        setUser(jwtDecode<UserType>(data.accessToken));
        setIsAuthenticated(true);
        router.push('/dashboard');
      } else {
        throw new Error('Failed to sign in');
      }
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    TokenStore.removeAccessToken();
    TokenStore.removeRefreshToken();
    setUser(null);
    setIsAuthenticated(false);
    router.push('/login');
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ user, accessToken, loginUser, logoutUser, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
