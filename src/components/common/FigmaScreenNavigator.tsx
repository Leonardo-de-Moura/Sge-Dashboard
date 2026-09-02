import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Compass, X, ChevronRight, Layers, Palette, GraduationCap, BookOpen, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

type ScreenItem = {
  label: string;
  path: string;
  role?: string;
};

type ScreenGroup = {
  group: string;
  items: ScreenItem[];
};

export const FigmaScreenNavigator: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setRole } = useAuth();

  const screens: ScreenGroup[] = [
    {
      group: '1. Autenticação & Entrada',
      items: [
        { label: 'Tela Entrar / Cadastrar (Landing)', path: '/' },
        { label: 'Definir Função (Aluno / Professor)', path: '/definir-funcao' },
        { label: 'Tela Login - Aluno', path: '/login/aluno' },
        { label: 'Tela Login - Professor', path: '/login/professor' },
        { label: 'Tela Cadastro - Aluno', path: '/cadastro/aluno' },
        { label: 'Tela Cadastro - Professor', path: '/cadastro/professor' },
        { label: 'Tela Recuperação de Senha', path: '/recuperar-senha' },
        { label: 'Tela Envio de E-mail', path: '/email-enviado' },
      ],
    },
    {
      group: '2. Módulo Aluno (Discente)',
      items: [
        { label: 'Tela Inicial - Aluno (Dashboard)', path: '/aluno/inicio', role: 'aluno' },
        { label: 'Tela de Eventos - Aluno (Inscrições)', path: '/aluno/eventos', role: 'aluno' },
        { label: 'Minhas Inscrições', path: '/aluno/inscricoes', role: 'aluno' },
        { label: 'Certificados do Aluno', path: '/aluno/certificados', role: 'aluno' },
      ],
    },
    {
      group: '3. Módulo Professor (Docente)',
      items: [
        { label: 'Tela Inicial - Professor (Dashboard)', path: '/professor/inicio', role: 'professor' },
        { label: 'Tela de Eventos - Professor (Criar Novo Evento)', path: '/professor/criar-evento', role: 'professor' },
        { label: 'Tela Confirmar Inscrição (Presenças)', path: '/professor/presencas', role: 'professor' },
        { label: 'Tela de Emitir Certificados', path: '/professor/certificados', role: 'professor' },
        { label: 'Gerenciar Eventos', path: '/professor/gerenciar', role: 'professor' },
      ],
    },
    {
      group: '4. Design System & Apoio',
      items: [
       
        { label: 'Perfil Institucional', path: '/aluno/perfil' },
        { label: 'Ajuda & FAQs', path: '/aluno/ajuda' },
      ],
    },
  ];

  const handleNavigate = (path: string, targetRole?: string) => {
    if (targetRole === 'aluno' || targetRole === 'professor') {
      setRole(targetRole);
    }
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Action Trigger on left side, higher than before */}
      <div className="fixed bottom-45 left-4 z-50">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-gray-900/90 hover:bg-black text-white shadow-2xl backdrop-blur-md text-xs font-semibold tracking-wide hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/20"
          title="Ver todas as 15 telas do Figma"
        >
          <Compass className="w-4 h-4 text-[#C9EEB4]" />
          <span>Telas do Figma ({screens.reduce((acc, g) => acc + g.items.length, 0)})</span>
        </button>
      </div>

      {/* Modal / Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl max-w-2xl w-full max-h-[88vh] flex flex-col overflow-hidden text-left">
            {/* Header */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#006A38] text-white">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">
                    Navegador de Telas do Figma
                  </h3>
                  <p className="text-xs text-gray-500">
                    Acesse qualquer uma das telas implementadas para copiar o código ou testar
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="p-5 overflow-y-auto space-y-6">
              {screens.map((group) => (
                <div key={group.group} className="space-y-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    {group.group}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {group.items.map((item) => {
                      const isActive = location.pathname === item.path;

                      return (
                        <button
                          key={item.path}
                          type="button"
                          onClick={() => handleNavigate(item.path, item.role)}
                          className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                            isActive
                              ? 'border-[#006A38] bg-emerald-50 text-[#006A38] shadow-2xs font-bold'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          <span className="truncate pr-2">{item.label}</span>
                          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 text-xs text-gray-500 flex items-center justify-between">
              <span>Mobile-first & 100% responsivo com Tailwind CSS</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
