/**
 * SGE-IFCE - Serviço de Controle de Presenças
 * Conecta com os endpoints do AttendanceController da API .NET 6.0
 */

import { apiClient, ApiResponse } from './apiClient';
import { ParticipantAttendance } from '../types';

export interface CheckInPayload {
  eventId: string;
  matricula: string;
}

export interface BulkAttendancePayload {
  attendanceIds: string[];
  status: 'presente' | 'ausente' | 'pendente';
}

export const attendanceService = {
  /**
   * Lista todos os participantes e status de presença de um evento
   */
  async getEventAttendance(eventId: string): Promise<ApiResponse<ParticipantAttendance[]>> {
    return apiClient.get<ParticipantAttendance[]>(`/attendance/event/${eventId}`);
  },

  /**
   * Realiza credenciamento/check-in de um aluno via matrícula
   */
  async checkIn(payload: CheckInPayload): Promise<ApiResponse<ParticipantAttendance>> {
    return apiClient.post<ParticipantAttendance>('/attendance/checkin', payload);
  },

  /**
   * Atualiza o status individual de presença de um participante
   */
  async updateStatus(id: string, status: 'presente' | 'ausente' | 'pendente'): Promise<ApiResponse<ParticipantAttendance>> {
    return apiClient.put<ParticipantAttendance>(`/attendance/${id}/status`, { status });
  },

  /**
   * Atualiza o status de múltiplos participantes em lote
   */
  async bulkUpdate(payload: BulkAttendancePayload): Promise<ApiResponse<boolean>> {
    return apiClient.post<boolean>('/attendance/bulk', payload);
  }
};
