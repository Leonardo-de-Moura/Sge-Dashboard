import React, { useState } from 'react';
import { Search, SlidersHorizontal, MapPin, Calendar, Clock, CheckCircle2, ChevronRight, X, User } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { mockEvents } from '../../data/mockData';
import { EventItem } from '../../types';
import { Button } from '../../components/common/Button';

export const StudentEventsPage: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventItem>(mockEvents[2]); // Default Semana da Inovação
  const [searchTerm, setSearchTerm] = useState('');
  const [registeredEvents, setRegisteredEvents] = useState<string[]>(['1']);
  const [showConfirmationToast, setShowConfirmationToast] = useState(false);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

  const filteredEvents = mockEvents.filter((ev) =>
    ev.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ev.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ev.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectEvent = (event: EventItem) => {
    setSelectedEvent(event);
    setMobileDetailOpen(true);
  };

  const handleConfirmRegistration = () => {
    if (selectedEvent && !registeredEvents.includes(selectedEvent.id)) {
      setRegisteredEvents([...registeredEvents, selectedEvent.id]);
      setShowConfirmationToast(true);
      setTimeout(() => setShowConfirmationToast(false), 3500);
    }
  };

  const isSelectedRegistered = selectedEvent && registeredEvents.includes(selectedEvent.id);

  return (
    <DashboardLayout
      title="Eventos disponíveis"
      subtitle="Veja os eventos abertos e em que você pode participar"
    >
      {/* Toast Alert */}
      {showConfirmationToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#006A38] text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 text-xs sm:text-sm font-semibold">
          <CheckCircle2 className="w-5 h-5 text-[#C9EEB4]" />
          <span>Inscrição confirmada com sucesso! Código gerado.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Event List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Search bar */}
          <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-gray-200">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar eventos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 text-sm bg-transparent rounded-xl focus:outline-none"
              />
            </div>
            <button
              type="button"
              className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filtros</span>
            </button>
          </div>

          {/* Event Cards */}
          <div className="space-y-3">
            {filteredEvents.map((event) => {
              const isSelected = selectedEvent?.id === event.id;
              const isEnrolled = registeredEvents.includes(event.id);

              return (
                <div
                  key={event.id}
                  onClick={() => handleSelectEvent(event)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'border-[#006A38] bg-emerald-50/30 ring-1 ring-[#006A38] shadow-xs'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100/60 text-[#006A38] uppercase">
                        {event.category}
                      </span>
                      <h4 className="text-base font-bold text-gray-900 leading-snug">
                        {event.title}
                      </h4>
                    </div>
                    {isEnrolled && (
                      <span className="flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C9EEB4] text-[#004D26]">
                        Inscrito
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        {event.dayMonth}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {event.workload}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectEvent(event);
                      }}
                      className="text-[#006A38] font-bold inline-flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <span>Ver atividades</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Event Sheet (5 cols on lg, floating modal on mobile) */}
        {selectedEvent && (
          <div
            className={`lg:col-span-5 bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-6 ${
              mobileDetailOpen
                ? 'fixed inset-x-4 bottom-4 top-20 z-50 overflow-y-auto lg:static lg:inset-auto lg:top-auto lg:overflow-visible'
                : 'hidden lg:block'
            }`}
          >
            {/* Close button on mobile */}
            <div className="flex items-center justify-between lg:hidden pb-3 border-b border-gray-100">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Detalhes do Evento
              </span>
              <button
                type="button"
                onClick={() => setMobileDetailOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Event Cover with href="" as requested */}
            <a href="" className="block w-full h-40 rounded-2xl bg-gradient-to-tr from-[#006A38] to-[#0D4D26] text-white p-5 relative overflow-hidden flex flex-col justify-end group" title="Imagem do evento">
              <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                {selectedEvent.modality}
              </div>
              <span className="text-[11px] font-bold text-[#C9EEB4] uppercase tracking-wider">
                {selectedEvent.category}
              </span>
              <h3 className="text-lg font-extrabold text-white leading-tight">
                {selectedEvent.title}
              </h3>
            </a>

            {/* Metadata tags */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100">
                <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Data</span>
                <span className="font-semibold text-gray-800 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#006A38]" />
                  {selectedEvent.startDate} {selectedEvent.endDate ? `a ${selectedEvent.endDate}` : ''}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100">
                <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Carga Horária</span>
                <span className="font-semibold text-gray-800 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#006A38]" />
                  {selectedEvent.workload}
                </span>
              </div>
            </div>

            <div className="text-xs text-gray-600 flex items-start gap-2 bg-gray-50 p-3 rounded-2xl">
              <MapPin className="w-4 h-4 text-[#006A38] flex-shrink-0 mt-0.5" />
              <span>{selectedEvent.location}</span>
            </div>

            {/* Activities schedule */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-gray-900">
                  Atividades disponíveis
                </h4>
                <span className="text-xs text-gray-500 font-medium">
                  {selectedEvent.activities?.length || 0} programadas
                </span>
              </div>

              <div className="space-y-2.5">
                {selectedEvent.activities?.map((act) => (
                  <div key={act.id} className="p-3 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-gray-900">{act.title}</span>
                      <span className="text-[10px] text-gray-500 font-semibold bg-white px-2 py-0.5 rounded-md border border-gray-200">
                        {act.time}
                      </span>
                    </div>
                    {act.speaker && (
                      <p className="text-[11px] text-gray-500 flex items-center gap-1">
                        <User className="w-3 h-3 text-gray-400" />
                        {act.speaker}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action button */}
            <div className="pt-2">
              {isSelectedRegistered ? (
                <div className="p-3 rounded-2xl bg-[#C9EEB4] text-[#004D26] text-center text-xs font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Você já está inscrito neste evento</span>
                </div>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleConfirmRegistration}
                >
                  Confirmar inscrição
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
