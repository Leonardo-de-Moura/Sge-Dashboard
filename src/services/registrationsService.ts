/**
 * SGE-IFCE - Serviço de Inscrições e Ingressos
 * Conecta com os endpoints do RegistrationsController da API .NET 6.0
 */

import { apiClient, ApiResponse } from './apiClient';
import { Registration } from '../types';

export interface CreateRegistrationPayload {
  eventId: string;
  userId?: string;
  participantName?: string;
  participantEmail?: string;
  matricula?: string;
}

export const registrationsService = {
  /**
   * Realiza inscrição em um evento para o aluno
   */
  async createRegistration(payload: CreateRegistrationPayload): Promise<ApiResponse<Registration>> {
    return apiClient.post<Registration>('/registrations', payload);
  },

  /**
   * Lista todas as inscrições de um determinado aluno/usuário
   */
  async getMyRegistrations(userId: string): Promise<ApiResponse<Registration[]>> {
    return apiClient.get<Registration[]>(`/registrations/user/${userId}`);
  },

  /**
   * Consulta os dados de um ingresso/ticket pelo código alfanumérico
   */
  async getTicketByCode(ticketCode: string): Promise<ApiResponse<Registration>> {
    return apiClient.get<Registration>(`/registrations/ticket/${ticketCode}`);
  },

  /**
   * Obtém detalhes de uma inscrição específica pelo seu ID
   */
  async getRegistrationById(id: string): Promise<ApiResponse<Registration>> {
    return apiClient.get<Registration>(`/registrations/${id}`);
  },

  /**
   * Cancela uma inscrição existente
   */
  async cancelRegistration(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete<boolean>(`/registrations/${id}`);
  }
};
