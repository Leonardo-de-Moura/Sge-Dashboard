/**
 * SGE-IFCE - Serviço de Eventos
 * Conecta com os endpoints do EventsController da API .NET 6.0
 */

import { apiClient, ApiResponse } from './apiClient';
import { EventItem, Activity } from '../types';

export interface EventFilters {
  category?: string;
  modality?: string;
  status?: string;
  search?: string;
}

export interface CreateActivityPayload {
  title: string;
  time: string;
  speaker?: string;
  location?: string;
  order?: number;
}

export interface CreateEventPayload {
  title: string;
  description: string;
  category: string;
  modality: 'Presencial' | 'Online' | 'Híbrido';
  startDate: string;
  endDate?: string;
  workload: string;
  location: string;
  totalSlots: number;
  dayMonth?: string;
  imageUrl?: string;
  activities?: CreateActivityPayload[];
}

export const eventsService = {
  /**
   * Lista eventos com filtros opcionais de categoria, modalidade, status e busca
   */
  async getEvents(filters?: EventFilters): Promise<ApiResponse<EventItem[]>> {
    return apiClient.get<EventItem[]>('/events', filters as Record<string, string | number | boolean | undefined>);
  },

  /**
   * Obtém detalhes completos de um evento pelo seu identificador
   */
  async getEventById(id: string): Promise<ApiResponse<EventItem>> {
    return apiClient.get<EventItem>(`/events/${id}`);
  },

  /**
   * Criação de novo evento acadêmico (perfil Professor)
   */
  async createEvent(payload: CreateEventPayload): Promise<ApiResponse<EventItem>> {
    return apiClient.post<EventItem>('/events', payload);
  },

  /**
   * Atualização de dados de um evento existente
   */
  async updateEvent(id: string, payload: Partial<CreateEventPayload>): Promise<ApiResponse<EventItem>> {
    return apiClient.put<EventItem>(`/events/${id}`, payload);
  },

  /**
   * Atualização de status do evento (Aberto, Esgotado, Encerrado)
   */
  async updateStatus(id: string, status: 'Aberto' | 'Esgotado' | 'Encerrado'): Promise<ApiResponse<EventItem>> {
    return apiClient.patch<EventItem>(`/events/${id}/status`, { status });
  },

  /**
   * Adiciona uma atividade ao cronograma do evento
   */
  async addActivity(eventId: string, activity: CreateActivityPayload): Promise<ApiResponse<Activity>> {
    return apiClient.post<Activity>(`/events/${eventId}/activities`, activity);
  },

  /**
   * Remove um evento
   */
  async deleteEvent(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete<boolean>(`/events/${id}`);
  }
};
