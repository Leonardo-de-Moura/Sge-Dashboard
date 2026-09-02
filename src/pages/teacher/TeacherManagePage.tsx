import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderKanban, Plus, Edit, Users, CheckSquare, Award } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { mockEvents } from '../../data/mockData';
import { Button } from '../../components/common/Button';

export const TeacherManagePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout
      title="Gerenciar Eventos"
      subtitle="Painel consolidado para edição, controle de capacidade e encerramento de eventos"
    >
      <div className="space-y-6 text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-gray-900">Seus eventos cadastrados</h3>
            <p className="text-xs text-gray-500">Acompanhe métricas em tempo real e faça manutenções</p>
          </div>
          <Button
            variant="primary"
            size="md"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => navigate('/professor/criar-evento')}
          >
            Novo Evento
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {mockEvents.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-3xl border border-gray-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#006A38] uppercase">
                    {ev.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    Status: <strong className="text-gray-800">{ev.status}</strong>
                  </span>
                </div>

                <h4 className="text-base font-bold text-gray-900">{ev.title}</h4>
                <p className="text-xs text-gray-500 line-clamp-1">{ev.description}</p>

                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span><strong>{ev.enrolledSlots}</strong> de {ev.totalSlots} vagas preenchidas</span>
                  <span>•</span>
                  <span>{ev.startDate}</span>
                  <span>•</span>
                  <span>{ev.location.split('-')[0]}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-gray-100 flex-wrap">
                <button
                  type="button"
                  onClick={() => navigate('/professor/presencas')}
                  className="px-3.5 py-1.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-gray-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <CheckSquare className="w-3.5 h-3.5 text-[#006A38]" />
                  <span>Presenças</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/professor/certificados')}
                  className="px-3.5 py-1.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-gray-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5 text-[#006A38]" />
                  <span>Certificados</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/professor/criar-evento')}
                  className="px-3.5 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-800 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Editar</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};
