import React, { useState } from 'react';
import { Search, Award, CheckCircle, Clock, FileCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { mockParticipants, mockEvents } from '../../data/mockData';
import { ParticipantAttendance } from '../../types';
import { Button } from '../../components/common/Button';

export const CertificatesPage: React.FC = () => {
  const [selectedEventId, setSelectedEventId] = useState('1'); // Inteligência Artificial
  const [participants, setParticipants] = useState<ParticipantAttendance[]>(mockParticipants);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'todos' | 'presenca' | 'ausentes'>('todos');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedEvent = mockEvents.find((e) => e.id === selectedEventId) || mockEvents[0];

  const filteredParticipants = participants
    .filter((p) => {
      if (filterType === 'presenca') return p.status === 'presente';
      if (filterType === 'ausentes') return p.status === 'ausente';
      return true;
    })
    .filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.matricula.includes(searchTerm)
    );

  const issuedCount = participants.filter((p) => p.certificateIssued).length;
  const pendingCount = participants.filter((p) => p.status === 'presente' && !p.certificateIssued).length;

  const handleEmitSingle = (id: string) => {
    setParticipants(
      participants.map((p) => (p.id === id ? { ...p, certificateIssued: true } : p))
    );
    setToastMessage('Certificado emitido e enviado por e-mail!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleEmitAll = () => {
    setParticipants(
      participants.map((p) => (p.status === 'presente' ? { ...p, certificateIssued: true } : p))
    );
    setToastMessage('Todos os certificados para alunos presentes foram gerados!');
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <DashboardLayout
      title="Emitir certificados"
      subtitle="Validação e emissão dos certificados digitais de conclusão com autenticação IFCE"
    >
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#006A38] text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 text-xs sm:text-sm font-semibold">
          <CheckCircle2 className="w-5 h-5 text-[#C9EEB4]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Main List Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Event selector bar */}
          <div className="bg-white rounded-3xl border border-gray-200 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                Evento em processamento
              </span>
              <h3 className="text-base sm:text-lg font-bold text-gray-900">{selectedEvent.title}</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Carga horária: {selectedEvent.workload} • {selectedEvent.modality}
              </p>
            </div>
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="text-xs font-semibold text-[#006A38] bg-emerald-50 border border-[#C9EEB4] rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
            >
              {mockEvents.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  Trocar: {ev.title}
                </option>
              ))}
            </select>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Buscar discente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 text-xs sm:text-sm bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-[#006A38] focus:bg-white transition-colors"
                />
              </div>

              <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setFilterType('todos')}
                  className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                    filterType === 'todos' ? 'bg-[#006A38] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Todos ({participants.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterType('presenca')}
                  className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                    filterType === 'presenca' ? 'bg-[#006A38] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Presentes ({participants.filter(p => p.status === 'presente').length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterType('ausentes')}
                  className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                    filterType === 'ausentes' ? 'bg-[#006A38] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Ausentes ({participants.filter(p => p.status === 'ausente').length})
                </button>
              </div>
            </div>

            {/* Participants list */}
            <div className="divide-y divide-gray-100">
              {filteredParticipants.map((p) => {
                const canEmit = p.status === 'presente' && !p.certificateIssued;

                return (
                  <div
                    key={p.id}
                    className="p-4 sm:px-6 hover:bg-gray-50/70 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <a href="" className="w-9 h-9 rounded-full bg-emerald-100 text-[#006A38] font-bold text-xs flex items-center justify-center flex-shrink-0" title="Foto do aluno">
                        {p.name.charAt(0)}
                      </a>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug">
                          {p.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-gray-500">
                          <span>{p.matricula}</span>
                          <span>•</span>
                          <span className={p.status === 'presente' ? 'text-[#006A38] font-semibold' : 'text-[#A62B26] font-semibold'}>
                            {p.status === 'presente' ? 'Frequência confirmada' : 'Ausente no evento'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="self-end sm:self-auto">
                      {p.certificateIssued ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#C9EEB4] text-[#004D26] text-xs font-bold">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Certificado emitido
                        </span>
                      ) : p.status === 'ausente' ? (
                        <span className="text-xs text-gray-400 font-medium italic">
                          Ineligível (ausente)
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleEmitSingle(p.id)}
                          className="px-3.5 py-1.5 rounded-xl bg-[#006A38] hover:bg-[#004D26] text-white text-xs font-bold transition-colors cursor-pointer"
                        >
                          Emitir certificado
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Summary Card (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-6 text-left">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <Award className="w-5 h-5 text-[#006A38]" />
            <h4 className="text-base font-bold text-gray-900">Resumo de Emissão</h4>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50/60 border border-[#C9EEB4]">
              <span className="font-semibold text-gray-700">Certificados Emitidos</span>
              <span className="text-base font-bold text-[#006A38]">{issuedCount}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50/70 border border-amber-200">
              <span className="font-semibold text-gray-700">Pendentes de Emissão</span>
              <span className="text-base font-bold text-amber-700">{pendingCount}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-100">
              <span className="font-semibold text-gray-700">Cancelados / Inelegíveis</span>
              <span className="text-base font-bold text-gray-500">
                {participants.filter(p => p.status === 'ausente').length}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100 space-y-3">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              disabled={pendingCount === 0}
              onClick={handleEmitAll}
              leftIcon={<Award className="w-4 h-4" />}
            >
              Emitir todos os certificados
            </Button>
            <p className="text-[11px] text-gray-400 text-center leading-tight">
              Os certificados serão gerados com assinatura digital do campus e disponibilizados imediatamente aos alunos.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
