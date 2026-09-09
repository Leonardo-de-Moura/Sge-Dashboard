# SGE-IFCE - Guia de Conexão Frontend ↔ Backend (Repositórios Separados)

Este guia contém **todas as configurações, padrões de código e variáveis necessárias** para conectar qualquer aplicação Frontend (React, Vue, Angular, Next.js, Mobile) ao backend **C# .NET 6.0** do SGE-IFCE quando hospedados em **repositórios Git separados**.

---

## 📁 1. Separação em Repositórios Independentes

### Como inicializar o repositório exclusivo do Backend:
A pasta `backend/` já contém sua própria solução `.sln`, `.gitignore`, `Dockerfile`, `docker-compose.yml`, scripts de banco e documentação Swagger.

Para transformá-la em um repositório Git isolado no GitHub / GitLab:
```bash
# 1. Entre na pasta do backend
cd backend

# 2. Inicialize o repositório Git local
git init

# 3. Adicione todos os arquivos do backend
git add .

# 4. Crie o primeiro commit
git commit -m "feat: SGE-IFCE Backend standalone (.NET 6.0 + PostgreSQL + Swagger)"

# 5. Conecte ao seu repositório remoto (exemplo)
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/sge-ifce-backend.git

# 6. Envie os arquivos
git push -u origin main
```

---

## 🌐 2. Configuração de Ambiente no Frontend

No repositório do seu Frontend, defina o arquivo de ambiente:

### `.env` (ou `.env.local`)
```env
# URL base da API C# .NET (porta 5000 padrão)
VITE_API_URL=http://localhost:5000/api

# Em produção (exemplo: Render, Railway, Fly.io, Cloud Run):
# VITE_API_URL=https://api-sge-ifce.onrender.com/api
```

---

## ⚡ 3. Configuração de Proxy no Vite (Opcional - Desenvolvimento Local)

Para evitar qualquer bloqueio de CORS em navegadores durante o desenvolvimento, configure o proxy no seu `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
```

---

## 🔒 4. Como o Backend Trata CORS

O backend .NET 6.0 em `Program.cs` já vem com política CORS flexível e segura configurada para aceitar requisições de qualquer origem local ou de produção com suporte a credenciais:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.SetIsOriginAllowed(_ => true)
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});
```

---

## 📦 5. Cliente HTTP Centralizado (`apiClient.ts`)

Crie em `src/services/apiClient.ts` no seu frontend para padronizar cabeçalhos, tokens de autenticação e tratamento de erros:

```typescript
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data: T;
  errors?: string[];
}

export const API_BASE_URL =
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

  public async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...this.getAuthHeader(),
      ...(options.headers as Record<string, string> || {}),
    };

    const response = await fetch(url, { ...options, headers });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMsg = data?.message || (data?.errors && data.errors.join(', ')) || `Erro ${response.status}`;
      throw new Error(errorMsg);
    }

    return data as ApiResponse<T>;
  }

  public get<T>(endpoint: string, params?: Record<string, any>) {
    let url = endpoint;
    if (params) {
      const q = new URLSearchParams(params).toString();
      if (q) url += (url.includes('?') ? '&' : '?') + q;
    }
    return this.request<T>(url, { method: 'GET' });
  }

  public post<T>(endpoint: string, body?: any) {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  public put<T>(endpoint: string, body?: any) {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  public patch<T>(endpoint: string, body?: any) {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  public delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
```

---

## 📑 6. Catálogo de Endpoints e Métodos no Frontend

### A. Autenticação (`/api/auth`)
| Método HTTP | Rota | Descrição | Payload / Exemplo |
|---|---|---|---|
| `POST` | `/api/auth/login` | Login de Aluno ou Professor | `{ "email": "...", "password": "...", "role": "aluno" }` |
| `POST` | `/api/auth/register/student` | Cadastro com Matrícula IFCE | `{ "name": "...", "email": "...", "matricula": "2023...", "password": "..." }` |
| `POST` | `/api/auth/register/teacher` | Cadastro com SIAPE IFCE | `{ "name": "...", "email": "...", "siape": "19...", "password": "..." }` |
| `POST` | `/api/auth/forgot-password` | Recuperação de Senha | `{ "email": "aluno@aluno.ifce.edu.br" }` |

### B. Eventos e Cronogramas (`/api/events`)
| Método HTTP | Rota | Descrição |
|---|---|---|
| `GET` | `/api/events` | Lista eventos (filtros opcionais `category`, `modality`, `status`, `search`) |
| `GET` | `/api/events/{id}` | Retorna dados completos do evento e suas atividades |
| `POST` | `/api/events` | Cria novo evento (exclusivo para Docente) |
| `PUT` | `/api/events/{id}` | Edita dados de um evento |
| `PATCH` | `/api/events/{id}/status` | Altera status (`Aberto`, `Esgotado`, `Encerrado`) |
| `POST` | `/api/events/{id}/activities` | Adiciona atividade ao cronograma |
| `DELETE` | `/api/events/{id}` | Remove um evento |

### C. Inscrições e Ingressos (`/api/registrations`)
| Método HTTP | Rota | Descrição |
|---|---|---|
| `POST` | `/api/registrations` | Realiza inscrição (`{ "eventId": "...", "userId": "..." }`) |
| `GET` | `/api/registrations/user/{userId}` | Lista inscrições do aluno com ingressos |
| `GET` | `/api/registrations/ticket/{code}` | Consulta dados do ingresso pelo código alfanumérico (QR Code) |
| `DELETE` | `/api/registrations/{id}` | Cancela inscrição |

### D. Presença e Credenciamento (`/api/attendance`)
| Método HTTP | Rota | Descrição |
|---|---|---|
| `GET` | `/api/attendance/event/{eventId}` | Lista presença de todos os inscritos |
| `POST` | `/api/attendance/checkin` | Check-in por Matrícula (`{ "eventId": "...", "matricula": "..." }`) |
| `PUT` | `/api/attendance/{id}/status` | Atualiza status (`presente`, `ausente`, `pendente`) |
| `POST` | `/api/attendance/bulk` | Atualização em lote de múltiplos participantes |

### E. Certificados (`/api/certificates`)
| Método HTTP | Rota | Descrição |
|---|---|---|
| `GET` | `/api/certificates/user/{userId}` | Lista certificados emitidos para o aluno |
| `POST` | `/api/certificates/generate` | Emite certificado para participante presente |
| `GET` | `/api/certificates/validate/{code}` | Validação pública de autenticidade pelo código hash único |

### F. Painéis e Métricas (`/api/dashboard`)
| Método HTTP | Rota | Descrição |
|---|---|---|
| `GET` | `/api/dashboard/student/{userId}` | Métricas consolidadas do aluno (horas concluídas, eventos, ingressos) |
| `GET` | `/api/dashboard/teacher/{userId}` | Métricas consolidadas do professor (eventos criados, alunos credenciados) |

### G. Geração de Dados (`/api/seed`)
| Método HTTP | Rota | Descrição |
|---|---|---|
| `POST` | `/api/seed/generate` | Popula dados de demonstração se o banco estiver vazio |
| `POST` | `/api/seed/reset` | Reseta e repopula todos os dados de teste institucionais |

---

## 🚀 7. Como Executar os Dois Repositórios Simultaneamente

1. **Terminal 1 (Backend - C# .NET):**
   ```bash
   cd sge-ifce-backend
   docker-compose up -d     # ou: dotnet run --project src/SgeIfce.Api
   ```
   *Disponível em: `http://localhost:5000` (Swagger: `http://localhost:5000/swagger`)*

2. **Terminal 2 (Frontend - React / Vite):**
   ```bash
   cd sge-ifce-frontend
   npm install
   npm run dev
   ```
   *Disponível em: `http://localhost:3000` conectado à API em `http://localhost:5000/api`*
