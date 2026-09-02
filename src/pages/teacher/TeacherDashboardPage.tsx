import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, CheckSquare, Award, Calendar, Users, ArrowRight, TrendingUp } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { mockEvents } from '../../data/mockData';
import { EventCard } from '../../components/cards/EventCard';

export const TeacherDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout
      title="Painel do Docente"
      subtitle="Gerencie eventos acadêmicos, controle frequências e emita certificados"
    >
      <div className="space-y-6 sm:space-y-8">
        {/* Banner with Quick Action buttons */}
        <div className="rounded-3xl bg-gradient-to-r from-emerald-900 via-[#006A38] to-[#0D4D26] text-white p-6 sm:p-8 shadow-sm">
          <div className="max-w-2xl mb-6">
            <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/20 text-[#C9EEB4] mb-3 inline-block">
              Gestão Acadêmica IFCE
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight mb-2">
              Bem-Vindo(a) ao painel de gestão docente!
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Crie novos eventos, valide o credenciamento de estudantes em tempo real e assine certificados digitais.
            </p>
          </div>

          {/* 3 Quick Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => navigate('/professor/criar-evento')}
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-white text-gray-900 hover:bg-[#C9EEB4] transition-all font-bold text-xs sm:text-sm shadow-xs cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-xl bg-[#006A38] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <PlusCircle className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block font-bold">Criar novo evento</span>
                <span className="text-[10px] text-gray-500 font-normal">Cadastrar atividades</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => navigate('/professor/presencas')}
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-white text-gray-900 hover:bg-[#C9EEB4] transition-all font-bold text-xs sm:text-sm shadow-xs cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-xl bg-[#006A38] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <CheckSquare className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block font-bold">Confirmar presenças</span>
                <span className="text-[10px] text-gray-500 font-normal">Chamada de inscritos</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => navigate('/professor/certificados')}
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-white text-gray-900 hover:bg-[#C9EEB4] transition-all font-bold text-xs sm:text-sm shadow-xs cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-xl bg-[#006A38] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <Award className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block font-bold">Emitir certificados</span>
                <span className="text-[10px] text-gray-500 font-normal">Validação e envio</span>
              </div>
            </button>
          </div>
        </div>

        {/* Stats indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200">
            <span className="text-xs text-gray-500 font-medium">Eventos sob sua gestão</span>
            <p className="text-2xl sm:text-3xl font-black text-[#006A38] mt-1">4</p>
            <span className="text-[11px] text-gray-400">3 ativos no período</span>
          </div>
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200">
            <span className="text-xs text-gray-500 font-medium">Total de inscritos</span>
            <p className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">257</p>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
              <TrendingUp className="w-3 h-3" /> +18 hoje
            </span>
          </div>
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200">
            <span className="text-xs text-gray-500 font-medium">Presenças confirmadas</span>
            <p className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">84%</p>
            <span className="text-[11px] text-gray-400">Média geral do campus</span>
          </div>
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200">
            <span className="text-xs text-gray-500 font-medium">Certificados emitidos</span>
            <p className="text-2xl sm:text-3xl font-black text-[#A62B26] mt-1">112</p>
            <span className="text-[11px] text-gray-400">32 pendentes</span>
          </div>
        </div>

        {/* Managed Events List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900">
                Eventos coordenados
              </h3>
              <p className="text-xs text-gray-500">
                Selecione um evento para lançar presenças ou emitir certificados
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/professor/eventos')}
              className="text-xs font-bold text-[#006A38] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Ver todos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {mockEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 hover:border-gray-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex flex-col items-center justify-center w-14 h-16 rounded-xl bg-emerald-50 text-center p-1 border border-[#C9EEB4]">
                    <span className="text-lg font-black text-[#006A38]">{event.dayMonth.split(' ')[0]}</span>
                    <span className="text-[10px] font-bold text-gray-600">{event.dayMonth.split(' ')[1]}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 uppercase">
                      {event.category}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-gray-900 mt-1">
                      {event.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {event.enrolledSlots} inscritos • {event.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => navigate('/professor/presencas')}
                    className="px-3.5 py-1.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-gray-700 cursor-pointer"
                  >
                    Presenças
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/professor/certificados')}
                    className="px-3.5 py-1.5 rounded-xl bg-[#006A38] hover:bg-[#004D26] text-xs font-semibold text-white cursor-pointer"
                  >
                    Certificados
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
