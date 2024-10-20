"use client"

// context/AuthContext.tsx
import { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode';
import TokenStore from '@/lib/auth/tokenstore';
import {ApiMethod} from '@/lib/types/types';
import { useApi } from '@/hooks/useApi';
import { Routes } from '@/lib/routes/routes';
import Loading from '@/components/loading/loading';

const { sendRequest } = useApi();

type UserType = {
  username: string;
  createdAt:string;
  updatedAt:string;
  id: string;
  exp: number;
  iat: number;
};

type ContextType = {
  isAuthenticated: boolean;
  loginUser(username: string, password: string): Promise<void>;
  logoutUser(): void;
  accessToken: string | null;
  user: UserType | null;
  loading: boolean;
};

const AuthContext = createContext<ContextType>({
  isAuthenticated: false,
  loginUser: async () => {},
  logoutUser: () => {},
  accessToken: null,
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(TokenStore.getAccessToken());
  const [user, setUser] = useState<UserType | null>(accessToken ? jwtDecode<UserType>(accessToken) : null);
  const [loading, setLoading] = useState(true);
  const[isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
 
  useEffect(() => {
    const token = TokenStore.getAccessToken();

    if (token !== null) {
      try {
        const decodedUser = jwtDecode<UserType>(token);
        const currentTime = Math.floor(Date.now() / 1000)
        if (decodedUser.exp && decodedUser.exp > currentTime) {
          // Token is valid
          setUser(decodedUser);
          setAccessToken(token);
          setIsAuthenticated(true);
        } else {
          // Token is expired
          TokenStore.removeAccessToken();
          setUser(null);
          setIsAuthenticated(false);
          router.push('/login'); // Redirect to login if token is expired
        }
      } catch (error) {
        // If the token is invalid, remove it and log the user out
        TokenStore.removeAccessToken();
        setUser(null);
        setIsAuthenticated(false);
        router.push('/login');
      }
    }else {
      setIsAuthenticated(false);
      router.push('/login');

    }
    setLoading(false);

  }, []);

  const loginUser = async (username: string, password: string) => {
    setLoading(true);
    try {
      const { data, status } = await sendRequest(ApiMethod.POST, Routes.auth.login, { username, password });

      if (status === 200) { // Adjust based on your API response
        TokenStore.setAccessToken(data.accessToken);
        TokenStore.setRefreshToken(data.refreshToken);
        setAccessToken(data.accessToken);
        setUser(jwtDecode<UserType>(data.accessToken));
        router.push('/dashboard');
      } else {
        throw new Error('Failed to sign in');
      }
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    try {
      TokenStore.removeAccessToken();
      TokenStore.removeRefreshToken();
      setUser(null);
      router.push('/login');
    } catch (err) {
      throw err;
    }
  };

  if (loading) {
    return <Loading />;
  }


  return (
    <AuthContext.Provider value={{ user, accessToken, loginUser, logoutUser, isAuthenticated, loading }}>
        {!loading ? children : null}
    </AuthContext.Provider>
);

};

export default AuthContext;
