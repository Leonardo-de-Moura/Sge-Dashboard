import React from 'react';
import { ArrowLeft, Palette, Type, Check, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/common/Logo';
import { Button } from '../components/common/Button';

export const StyleGuidePage: React.FC = () => {
  const navigate = useNavigate();

  const colorTokens = [
    { name: 'primary-color', hex: '#006A38', desc: 'Cor principal da marca IFCE' },
    { name: 'primary-color-dark', hex: '#004D26', desc: 'Hover e estados ativos' },
    { name: 'primary-color-light', hex: '#C9EEB4', desc: 'Badges, destaques e fundos suaves' },
    { name: 'secondary-color', hex: '#A62B26', desc: 'Destaques, alertas e botão sair' },
    { name: 'secondary-color-light', hex: '#EFC8C3', desc: 'Badges de cancelado/ausente' },
    { name: 'text-color', hex: '#000000', desc: 'Títulos e corpo de texto principal' },
    { name: 'button-color / border', hex: '#DCDCDC', desc: 'Bordas e botões neutros' },
    { name: 'button-text-color', hex: '#1E1E1E', desc: 'Texto padrão de botões e cartões' },
    { name: 'background-neutral', hex: '#F8F9FA', desc: 'Fundo da aplicação' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-4 sm:p-8 max-w-5xl mx-auto text-left">
      <div className="flex items-center justify-between pb-6 border-b border-gray-200 mb-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Guia de Estilos (Figma SGE-IFCE)</h1>
            <p className="text-xs text-gray-500">Tokens de design, paleta oficial e tipografia Inter</p>
          </div>
        </div>
        <Logo size="sm" />
      </div>

      <div className="space-y-10">
        {/* Colors Section */}
        <section className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 mb-6">
            <Palette className="w-5 h-5 text-[#006A38]" />
            <h2 className="text-lg font-bold text-gray-900">Colors (Tokens de Cores)</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {colorTokens.map((c) => (
              <div key={c.name} className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100">
                <div
                  className="w-12 h-12 rounded-xl shadow-xs flex-shrink-0 border border-black/10"
                  style={{ backgroundColor: c.hex }}
                />
                <div>
                  <h4 className="text-xs font-bold text-gray-800">{c.name}</h4>
                  <span className="text-xs font-mono text-gray-500 block">{c.hex}</span>
                  <span className="text-[10px] text-gray-400">{c.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography Section */}
        <section className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 mb-6">
            <Type className="w-5 h-5 text-[#006A38]" />
            <h2 className="text-lg font-bold text-gray-900">Typography (Inter)</h2>
          </div>

          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
                Inter Semi Bold — 24px (Títulos e Cabeçalhos)
              </span>
              <p className="text-2xl font-semibold text-gray-900 leading-tight">
                Sistema de Gestão de Eventos SGE-IFCE
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
                Inter Bold — 18px (Subtítulos e Cards)
              </span>
              <p className="text-lg font-bold text-gray-900 leading-snug">
                Semana da Inovação e Tecnologia (Expotec 2026)
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
                Inter Regular / Medium — 14px (Corpo e Formulários)
              </span>
              <p className="text-sm text-gray-600 leading-relaxed">
                Participe, aprenda e compartilhe conhecimento nos eventos acadêmicos promovidos pelo Instituto Federal de Educação, Ciência e Tecnologia do Ceará.
              </p>
            </div>
          </div>
        </section>

        {/* Modular Buttons and Badges */}
        <section className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Componentes Modulares</h2>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Button variant="primary">Botão Primário</Button>
            <Button variant="secondary">Botão Secundário</Button>
            <Button variant="outline">Botão Neutro</Button>
            <Button variant="danger">Botão Alerta</Button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#C9EEB4] text-[#004D26]">
              Badge Ativo (#C9EEB4)
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#EFC8C3] text-[#A62B26]">
              Badge Esgotado (#EFC8C3)
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-700">
              Badge Neutro
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};
