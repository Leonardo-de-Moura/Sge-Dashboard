import React from 'react';
import { Award, Download, CheckCircle2, ShieldCheck, Calendar, Clock } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { mockCertificates } from '../../data/mockData';

export const StudentCertificatesPage: React.FC = () => {
  return (
    <DashboardLayout
      title="Meus Certificados"
      subtitle="Baixe seus certificados de participação e valide a autenticidade digital"
    >
      <div className="space-y-6 max-w-5xl text-left">
        {/* Verification callout */}
        <div className="bg-emerald-50 border border-[#C9EEB4] p-4 sm:p-5 rounded-3xl flex items-start gap-3.5">
          <ShieldCheck className="w-5 h-5 text-[#006A38] flex-shrink-0 mt-0.5" />
          <div className="text-xs text-gray-700 leading-relaxed">
            <strong className="text-[#006A38] block text-sm mb-0.5">Certificação Oficial IFCE:</strong>
            Todos os certificados emitidos pelo SGE possuem código verificador único e validade jurídica para aproveitamento de Atividades Complementares (AC) no campus.
          </div>
        </div>

        {/* Certificates List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockCertificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-3xl border border-gray-200 p-5 sm:p-6 shadow-xs hover:border-gray-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C9EEB4] text-[#004D26] uppercase">
                    Válido
                  </span>
                  <span className="text-[11px] font-mono text-gray-400">
                    {cert.code}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2 leading-snug">
                  {cert.eventTitle}
                </h3>

                <div className="space-y-1 text-xs text-gray-500 mb-4">
                  <p className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#006A38]" />
                    Carga horária: <span className="font-semibold text-gray-700">{cert.workload}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#006A38]" />
                    Emitido em: <span className="font-semibold text-gray-700">{cert.issueDate}</span>
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] text-gray-500">PDF Autenticado</span>
                <a
                  href=""
                  className="px-3.5 py-1.5 rounded-xl bg-[#006A38] hover:bg-[#004D26] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar Certificado</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};
