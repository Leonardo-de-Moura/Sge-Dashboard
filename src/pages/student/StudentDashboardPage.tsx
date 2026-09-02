import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowRight, Award, Ticket, CheckCircle, Sparkles } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { EventCard } from '../../components/cards/EventCard';
import { mockEvents, mockRegistrations, mockCertificates } from '../../data/mockData';
import { EventItem } from '../../types';

export const StudentDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [userRegistrations, setUserRegistrations] = useState<string[]>(['1']); // event 1 enrolled
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const categories = ['Todos', 'Palestra', 'Minicurso', 'Congresso', 'Oficina'];

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRegister = (event: EventItem) => {
    if (userRegistrations.includes(event.id)) return;
    setUserRegistrations([...userRegistrations, event.id]);
    setToastMessage(`Inscrição confirmada em "${event.title}"!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <DashboardLayout>
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#006A38] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 text-xs sm:text-sm font-semibold">
          <CheckCircle className="w-5 h-5 text-[#C9EEB4]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Grid: Left content (events) + Right widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Left main area (8 cols on desktop) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Welcome Banner matching Figma */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-50 via-emerald-100/40 to-[#C9EEB4]/30 border border-[#C9EEB4] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-left z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 text-[#006A38] text-xs font-bold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#006A38]" /> SGE-IFCE Campus Cedro
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
                Bem-Vindo(a) ao <span className="text-[#006A38]">SGE-IFCE!</span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-700 max-w-md leading-relaxed">
                Participe, aprenda e compartilhe conhecimento nos eventos acadêmicos promovidos pelo Instituto Federal.
              </p>
            </div>

            {/* Banner decorative asset with href="" as requested */}
            <a href="" className="w-28 h-28 sm:w-36 sm:h-36 flex-shrink-0 flex items-center justify-center p-3 rounded-2xl bg-white/70 shadow-xs border border-white" title="Ilustração IFCE">
              {/* Plant / Growth stylized illustration */}
              <div className="flex flex-col items-center justify-center text-[#006A38]">
                <div className="w-12 h-12 rounded-full bg-[#006A38] text-white flex items-center justify-center font-bold text-xl mb-1 shadow-sm">
                  IF
                </div>
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Eventos 2026</span>
              </div>
            </a>
          </div>

          {/* Search bar and Filters */}
          <div className="bg-white rounded-2xl border border-gray-200 p-3 sm:p-4 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Buscar eventos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-[#006A38] focus:bg-white transition-colors"
                />
              </div>
              <button
                type="button"
                onClick={() => setSelectedCategory(selectedCategory === 'Todos' ? 'Palestra' : 'Todos')}
                className="p-2 sm:px-3.5 sm:py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 flex items-center gap-1.5 text-xs font-semibold cursor-pointer transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline">Filtrar</span>
              </button>
            </div>

            {/* Category pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-medium no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#006A38] text-white font-semibold'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Events List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-gray-900">
                Próximos eventos
              </h3>
              <button
                type="button"
                onClick={() => navigate('/aluno/eventos')}
                className="text-xs font-bold text-[#006A38] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Ver todos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isRegistered={userRegistrations.includes(event.id)}
                  onActionClick={handleRegister}
                  actionLabel="Inscrever-se"
                />
              ))}

              {filteredEvents.length === 0 && (
                <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-500 text-sm">
                  Nenhum evento encontrado para os termos pesquisados.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right column: Widgets (4 cols on desktop) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Widget 1: Minhas inscrições */}
          <div className="bg-white rounded-3xl border border-gray-200 p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-[#006A38]" />
                <h4 className="text-sm font-bold text-gray-900">Minhas inscrições</h4>
              </div>
              <span className="text-[11px] font-semibold text-gray-500">
                {mockRegistrations.length} ativas
              </span>
            </div>

            <div className="space-y-3">
              {mockRegistrations.map((reg) => (
                <div
                  key={reg.id}
                  className="p-3.5 rounded-2xl bg-gray-50 hover:bg-emerald-50/40 border border-gray-100 transition-colors"
                >
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#C9EEB4] text-[#004D26] uppercase">
                    {reg.status}
                  </span>
                  <h5 className="text-xs font-bold text-gray-900 mt-2 line-clamp-2">
                    {reg.eventTitle}
                  </h5>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200/60 text-[11px] text-gray-500">
                    <span>{reg.date}</span>
                    <a href="" className="text-[#006A38] font-bold hover:underline inline-flex items-center gap-1">
                      <span>Ver ticket</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => navigate('/aluno/inscricoes')}
              className="mt-4 w-full py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
            >
              Ver todas as inscrições
            </button>
          </div>

          {/* Widget 2: Certificados */}
          <div className="bg-white rounded-3xl border border-gray-200 p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#006A38]" />
                <h4 className="text-sm font-bold text-gray-900">Certificados</h4>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C9EEB4] text-[#004D26]">
                {mockCertificates.length} disponíveis
              </span>
            </div>

            <p className="text-xs text-gray-600 mb-4 leading-relaxed">
              Você tem <strong>{mockCertificates.length} certificados</strong> prontos para download com autenticação digital.
            </p>

            <div className="space-y-2.5">
              {mockCertificates.slice(0, 2).map((cert) => (
                <div key={cert.id} className="p-3 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-bold text-gray-800 truncate">{cert.eventTitle}</p>
                    <p className="text-[10px] text-gray-500">{cert.workload} • Emitido em {cert.issueDate}</p>
                  </div>
                  <a href="" className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-[#006A38] text-white text-[11px] font-semibold hover:bg-[#004D26] transition-colors">
                    Emitir
                  </a>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => navigate('/aluno/certificados')}
              className="mt-4 w-full py-2 text-xs font-bold text-[#006A38] hover:underline flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Acessar todos os certificados</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
