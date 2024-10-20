"use client";

import { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import TokenStore from '@/lib/auth/tokenstore';
import { UserType, ContextType } from '@/lib/types/types';
import Loading from '@/components/loading/loading';


const AuthContext = createContext<ContextType>({
  isAuthenticated: false,
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
    <AuthContext.Provider value={{ user, accessToken, logoutUser, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
