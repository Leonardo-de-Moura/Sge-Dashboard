/**
 * SGE-IFCE - Serviço de Dashboard
 * Conecta com os endpoints do DashboardController da API .NET 6.0
 */

import { apiClient, ApiResponse } from './apiClient';
import { EventItem, Registration, ParticipantAttendance } from '../types';

export interface StudentDashboardData {
  activeRegistrationsCount: number;
  availableEventsCount: number;
  certificatesCount: number;
  completedHoursCount: number;
  upcomingRegistrations: Registration[];
  highlightedEvents: EventItem[];
}

export interface TeacherDashboardData {
  totalEventsCount: number;
  activeEventsCount: number;
  totalEnrolledStudents: number;
  certificatesIssuedCount: number;
  managedEvents: EventItem[];
  recentAttendances: ParticipantAttendance[];
}

export const dashboardService = {
  /**
   * Obtém os indicadores consolidados do painel do aluno
   */
  async getStudentDashboard(userId: string): Promise<ApiResponse<StudentDashboardData>> {
    return apiClient.get<StudentDashboardData>(`/dashboard/student/${userId}`);
  },

  /**
   * Obtém os indicadores consolidados do painel do professor
   */
  async getTeacherDashboard(userId: string): Promise<ApiResponse<TeacherDashboardData>> {
    return apiClient.get<TeacherDashboardData>(`/dashboard/teacher/${userId}`);
  }
};
