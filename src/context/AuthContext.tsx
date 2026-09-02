import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  setRole: (role: UserRole) => void;
  login: (role: UserRole, customName?: string, customEmail?: string) => void;
  logout: () => void;
  notificationsCount: number;
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
    // Default mock user matching the Figma "Olá, Luzia!"
    return {
      id: 'u-1',
      name: 'Luzia',
      email: 'luzia@aluno.ifce.edu.br',
      role: 'aluno',
      matricula: '2023108922'
    };
  });

  const [notificationsCount] = useState<number>(3);

  useEffect(() => {
    if (role) {
      localStorage.setItem('sge_role', role);
    }
  }, [role]);

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

  const login = (newRole: UserRole, customName = 'Luzia', customEmail?: string) => {
    setRoleState(newRole);
    const newUser: User = {
      id: 'u-1',
      name: customName,
      email: customEmail || (newRole === 'professor' ? `${customName.toLowerCase()}.docente@ifce.edu.br` : `${customName.toLowerCase()}@aluno.ifce.edu.br`),
      role: newRole,
      matricula: newRole === 'aluno' ? '2023108922' : undefined,
      siape: newRole === 'professor' ? '1849201' : undefined
    };
    setUser(newUser);
    localStorage.setItem('sge_role', newRole);
    localStorage.setItem('sge_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sge_user');
  };

  return (
    <AuthContext.Provider value={{ user, role, setRole, login, logout, notificationsCount }}>
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
