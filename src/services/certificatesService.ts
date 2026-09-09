/**
 * SGE-IFCE - Serviço de Certificados Acadêmicos
 * Conecta com os endpoints do CertificatesController da API .NET 6.0
 */

import { apiClient, ApiResponse } from './apiClient';
import { CertificateItem } from '../types';

export interface GenerateCertificatePayload {
  eventId: string;
  attendanceId: string;
}

export interface CertificateValidationResult {
  isValid: boolean;
  message: string;
  certificate?: CertificateItem;
}

export const certificatesService = {
  /**
   * Lista todos os certificados emitidos para um determinado aluno
   */
  async getUserCertificates(userId: string): Promise<ApiResponse<CertificateItem[]>> {
    return apiClient.get<CertificateItem[]>(`/certificates/user/${userId}`);
  },

  /**
   * Emissão de certificado para participante com presença confirmada
   */
  async generateCertificate(payload: GenerateCertificatePayload): Promise<ApiResponse<CertificateItem>> {
    return apiClient.post<CertificateItem>('/certificates/generate', payload);
  },

  /**
   * Validação pública da autenticidade de um certificado pelo seu código hash único
   */
  async validateCertificate(code: string): Promise<ApiResponse<CertificateValidationResult>> {
    return apiClient.get<CertificateValidationResult>(`/certificates/validate/${code}`);
  }
};
