/**
 * SGE-IFCE - Cliente HTTP para comunicação com o Backend .NET 6.0
 * 
 * Permite conexão com a API RESTful independente executando localmente
 * (http://localhost:5000/api) ou em qualquer ambiente de nuvem configurado.
 */

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data: T;
  errors?: string[];
}

// Resolução da URL base da API via variável de ambiente (Vite)
export const API_BASE_URL: string =
  import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:5000/api';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getAuthHeader(): Record<string, string> {
    const token = localStorage.getItem('sge_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

private async request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {

  const url = `${this.baseUrl}${
    endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  }`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...this.getAuthHeader(),
    ...(options.headers as Record<string, string> || {}),
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage =
        data?.message ||
        (data?.errors && data.errors.join(", ")) ||
        `Erro na requisição: ${response.status} ${response.statusText}`;

      throw new Error(errorMessage);
    }

    return data as ApiResponse<T>;

  } catch (error) {

    console.error("🚨 API CLIENT - ERRO:", error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Falha de conexão com a API do SGE-IFCE.");
  }
}
  public async get<T>(endpoint: string, params?: Record<string, string | number | boolean | undefined>): Promise<ApiResponse<T>> {
    let url = endpoint;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, String(value));
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        url += (url.includes('?') ? '&' : '?') + queryString;
      }
    }
    return this.request<T>(url, { method: 'GET' });
  }

  public async post<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  public async put<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  public async patch<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  public async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
