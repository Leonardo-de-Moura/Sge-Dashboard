import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, BookOpen, Eye, EyeOff } from 'lucide-react';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

export const LoginTeacherPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('luzia.docente@ifce.edu.br');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login('professor', 'Luzia', email);
      navigate('/professor/inicio');
    }, 400);
  };

  return (
    <AuthLayout>
      <div className="text-center mb-6">
        <a href="" className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#C9EEB4]/40 text-[#006A38] mb-3">
          <BookOpen className="w-6 h-6" />
        </a>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Faça seu <span className="text-[#006A38]">login</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Acesse a sua conta para gerenciar eventos, presenças e certificados
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="E-mail Institucional"
          type="email"
          required
          placeholder="Digite seu e-mail institucional"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<Mail className="w-4 h-4" />}
        />

        <div className="space-y-1">
          <Input
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            required
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
          />
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-gray-300 text-[#006A38] focus:ring-[#006A38]"
            />
            <span>Lembrar-me</span>
          </label>
          <Link
            to="/recuperar-senha"
            className="text-[#006A38] hover:underline font-semibold"
          >
            Esqueceu sua senha?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={loading}
          className="mt-2"
        >
          {loading ? 'Acessando...' : 'Entrar'}
        </Button>
      </form>

      <div className="mt-6 pt-5 border-t border-gray-100 text-center text-xs text-gray-600">
        Ainda não tem uma conta?{' '}
        <Link to="/cadastro/professor" className="text-[#006A38] font-bold hover:underline">
          Cadastre-se!
        </Link>
      </div>
    </AuthLayout>
  );
};
