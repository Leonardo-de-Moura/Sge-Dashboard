/**
 * SGE-IFCE - Serviço de Autenticação
 * Conecta com os endpoints do AuthController da API .NET 6.0
 */

import { apiClient, ApiResponse } from './apiClient';
import { User, UserRole } from '../types';

export interface LoginPayload {
  email: string;
  password: string;
  role?: UserRole;
}

export interface RegisterStudentPayload {
  name: string;
  email: string;
  matricula: string;
  password: string;
  course?: string;
  phone?: string;
}

export interface RegisterTeacherPayload {
  name: string;
  email: string;
  siape: string;
  password: string;
  department?: string;
  phone?: string;
}

export interface AuthResponseData {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    matricula?: string;
    siape?: string;
    department?: string;
    course?: string;
    phone?: string;
    avatarUrl?: string;
  };
}

export const authService = {
  /**
   * Realiza login no backend .NET e armazena o token
   */
  async login(payload: LoginPayload): Promise<ApiResponse<AuthResponseData>> {
    const response = await apiClient.post<AuthResponseData>('/auth/login', payload);
    if (response.data?.token) {
      localStorage.setItem('sge_token', response.data.token);
      localStorage.setItem('sge_user', JSON.stringify(response.data.user));
      localStorage.setItem('sge_role', response.data.user.role);
    }
    return response;
  },

  /**
   * Cadastro de Aluno com Matrícula IFCE
   */
  async registerStudent(payload: RegisterStudentPayload): Promise<ApiResponse<AuthResponseData>> {
    const response = await apiClient.post<AuthResponseData>('/auth/register/student', payload);
    if (response.data?.token) {
      localStorage.setItem('sge_token', response.data.token);
      localStorage.setItem('sge_user', JSON.stringify(response.data.user));
      localStorage.setItem('sge_role', 'aluno');
    }
    return response;
  },

  /**
   * Cadastro de Professor com SIAPE IFCE
   */
  async registerTeacher(payload: RegisterTeacherPayload): Promise<ApiResponse<AuthResponseData>> {
    const response = await apiClient.post<AuthResponseData>('/auth/register/teacher', payload);
    if (response.data?.token) {
      localStorage.setItem('sge_token', response.data.token);
      localStorage.setItem('sge_user', JSON.stringify(response.data.user));
      localStorage.setItem('sge_role', 'professor');
    }
    return response;
  },

  /**
   * Solicitação de recuperação de senha institucional
   */
  async forgotPassword(email: string): Promise<ApiResponse<string>> {
    return apiClient.post<string>('/auth/forgot-password', { email });
  },

  /**
   * Encerra sessão local removendo tokens e dados de usuário
   */
  logout(): void {
    localStorage.removeItem('sge_token');
    localStorage.removeItem('sge_user');
    localStorage.removeItem('sge_role');
  },

  /**
   * Retorna o usuário logado atualmente no armazenamento local
   */
  getCurrentUser(): User | null {
    const userJson = localStorage.getItem('sge_user');
    if (!userJson) return null;
    try {
      return JSON.parse(userJson) as User;
    } catch {
      return null;
    }
  },

  /**
   * Verifica se há token ativo armazenado
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('sge_token');
  }
};
