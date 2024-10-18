import AuthContext from '@/app/context/AuthContext';
import { useContext } from 'react';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must beused within an AuthProvider');
  }
  return context;  

};