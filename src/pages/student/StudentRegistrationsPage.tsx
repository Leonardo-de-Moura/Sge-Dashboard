import React from 'react';
import { Ticket, Calendar, MapPin, CheckCircle, Download, ExternalLink } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { mockRegistrations, mockEvents } from '../../data/mockData';

export const StudentRegistrationsPage: React.FC = () => {
  return (
    <DashboardLayout
      title="Minhas Inscrições"
      subtitle="Acompanhe seus eventos confirmados e acesse seus comprovantes de inscrição"
    >
      <div className="space-y-4 max-w-4xl text-left">
        <div className="grid grid-cols-1 gap-4">
          {mockRegistrations.map((reg) => {
            const event = mockEvents.find((e) => e.id === reg.eventId);

            return (
              <div
                key={reg.id}
                className="bg-white rounded-3xl border border-gray-200 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#C9EEB4] text-[#004D26] uppercase">
                      Inscrição {reg.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      Código: <strong className="font-mono text-gray-800">{reg.ticketCode}</strong>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-gray-900">
                    {reg.eventTitle}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#006A38]" />
                      {reg.date}
                    </span>
                    {event && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#006A38]" />
                        {event.location.split('-')[0]}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  <a
                    href=""
                    className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700 flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Baixar Ticket</span>
                  </a>
                  <a
                    href=""
                    className="px-4 py-2 rounded-xl bg-[#006A38] hover:bg-[#004D26] text-xs font-semibold text-white flex items-center gap-1.5 transition-colors"
                  >
                    <span>Ver Detalhes</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};
