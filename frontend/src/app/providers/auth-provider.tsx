'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'REALTOR' | 'INVESTOR';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for stored auth data on mount
    const storedToken = localStorage.getItem('access_token') || localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    console.log('🔐 Auth Provider: Checking stored auth');
    console.log('🔑 Stored token:', storedToken ? 'Present' : 'Missing');
    console.log('👤 Stored user:', storedUser ? 'Present' : 'Missing');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      console.log('✅ Auth restored from localStorage');
    } else {
      console.log('❌ No auth found in localStorage');
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Use centralized API client
      const { authApi } = await import('../../lib/api-endpoints');
      const data = await authApi.login(email, password);
      
      console.log('✅ Login successful:', data.user);
      
      setToken(data.access_token);
      setUser(data.user);

      // Store in localStorage - use 'access_token' to match API client
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('token', data.access_token); // Keep for backward compatibility
      localStorage.setItem('user', JSON.stringify(data.user));

      console.log('💾 Auth saved to localStorage');

      // Redirect based on role
      switch (data.user.role) {
        case 'ADMIN':
          router.push('/admin/dashboard');
          break;
        case 'REALTOR':
          router.push('/realtor/dashboard');
          break;
        case 'INVESTOR':
          router.push('/investor/dashboard');
          break;
        default:
          router.push('/');
      }

      return true;
    } catch (error) {
      console.error('❌ Login error:', error);
      return false;
    }
  };

  const logout = () => {
    console.log('🚪 Logging out...');
    setUser(null);
    setToken(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}