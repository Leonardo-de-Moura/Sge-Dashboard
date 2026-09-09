import type * as React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { authService, LoginPayload } from '../services/authService';
import { apiClient } from '../services/apiClient';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  backendConnected: boolean;
  setRole: (role: UserRole) => void;
  login: (role: UserRole, customName?: string, customEmail?: string, password?: string) => Promise<void>;
  logout: () => void;
  notificationsCount: number;
  checkBackendConnection: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole | null>(() => {
    const savedRole = localStorage.getItem('sge_role');
    return (savedRole as UserRole) || 'aluno';
  });

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('sge_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        return null;
      }
    }
    // Default user matching the institutional Figma model
    return {
      id: 'u-1',
      name: 'Luzia',
      email: 'luzia@aluno.ifce.edu.br',
      role: 'aluno',
      matricula: '2023108922'
    };
  });

  const [backendConnected, setBackendConnected] = useState<boolean>(false);
  const [notificationsCount] = useState<number>(3);

  const checkBackendConnection = async (): Promise<boolean> => {
    try {
      // Test basic connection to backend
      const res = await apiClient.get<unknown>('/events');
      if (res && (res.success || Array.isArray(res.data))) {
        setBackendConnected(true);
        return true;
      }
      setBackendConnected(true);
      return true;
    } catch {
      setBackendConnected(false);
      return false;
    }
  };

  useEffect(() => {
    if (role) {
      localStorage.setItem('sge_role', role);
    }
  }, [role]);

  useEffect(() => {
    checkBackendConnection();
  }, []);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (user) {
      const updatedUser = {
        ...user,
        role: newRole,
        email: newRole === 'professor' ? 'luzia.docente@ifce.edu.br' : 'luzia@aluno.ifce.edu.br',
        siape: newRole === 'professor' ? '1849201' : undefined,
        matricula: newRole === 'aluno' ? '2023108922' : undefined
      };
      setUser(updatedUser);
      localStorage.setItem('sge_user', JSON.stringify(updatedUser));
    }
  };

  const login = async (newRole: UserRole, customName = 'Luzia', customEmail?: string, password?: string) => {
    setRoleState(newRole);
    const emailToUse = customEmail || (newRole === 'professor' ? 'luzia.docente@ifce.edu.br' : 'luzia@aluno.ifce.edu.br');

    // Attempt direct login with backend API if password is provided
    if (password && customEmail) {
      try {
        const payload: LoginPayload = {
          email: emailToUse,
          password,
          role: newRole
        };
        const response = await authService.login(payload);
        if (response.success && response.data?.user) {
          const apiUser: User = {
            id: response.data.user.id,
            name: response.data.user.name,
            email: response.data.user.email,
            role: response.data.user.role,
            matricula: response.data.user.matricula,
            siape: response.data.user.siape,
            avatarUrl: response.data.user.avatarUrl
          };
          setUser(apiUser);
          setBackendConnected(true);
          return;
        }
      } catch (err) {
        console.warn('API backend login fallback triggered:', err);
      }
    }

    // Local fallback if API is not yet seeded or offline
    localStorage.removeItem('sge_token');
    const newUser: User = {
      id: 'u-1',
      name: customName,
      email: emailToUse,
      role: newRole,
      matricula: newRole === 'aluno' ? '2023108922' : undefined,
      siape: newRole === 'professor' ? '1849201' : undefined
    };
    setUser(newUser);
    localStorage.setItem('sge_role', newRole);
    localStorage.setItem('sge_user', JSON.stringify(newUser));
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      role,
      backendConnected,
      setRole,
      login,
      logout,
      notificationsCount,
      checkBackendConnection
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

