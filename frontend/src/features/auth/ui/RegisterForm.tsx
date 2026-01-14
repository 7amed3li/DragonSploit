import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Loader2, ArrowLeft } from 'lucide-react';
import { authApi } from '@/shared/api/auth';
import { useAuthStore } from '@/features/auth/model/authStore';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const RegisterForm = ({ onBack }: { onBack: () => void }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const setAuth = useAuthStore(state => state.setAuth);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    setError(null);

    try {
      const { data } = await authApi.register(formData);
      setAuth(data.user, data.accessToken);
      localStorage.setItem('dragonsploit-auth-token', data.accessToken);
      navigate('/');
    } catch (err: any) {
      console.error('Registration error details:', err);
      if (err.response) {
        console.error('Response data:', err.response.data);
        console.error('Response status:', err.response.status);
      }
      const backendMessage = err.response?.data?.message || err.response?.data?.mesaj;
      setError(backendMessage || `Access Denied: ${err.message || 'Registration Failed'}`);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-black/40 backdrop-blur-xl border border-cyber-green/30 rounded-lg shadow-[0_0_50px_rgba(0,255,65,0.1)] relative">
      <button 
        onClick={onBack}
        className="absolute top-4 left-4 rtl:left-auto rtl:right-4 text-cyber-green/40 hover:text-cyber-green transition-colors flex items-center gap-1 text-[10px] uppercase font-mono"
      >
        <ArrowLeft size={14} className="rtl:rotate-180" /> {t('auth.back_to_login')}
      </button>

      <div className="flex flex-col items-center mb-6 pt-4 text-center">
        <h2 className="text-2xl font-display font-bold text-cyber-green tracking-tighter uppercase">
          {t('auth.new_operator').split('[')[0]} <span className="text-white">{t('common.register')}</span>
        </h2>
        <p className="text-cyber-green/60 text-[10px] font-mono mt-2">
          CREATING SECURE PROFILE // SYS_ACC_LEVEL: 0
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[10px] font-mono uppercase mb-1 text-cyber-green/80 text-left rtl:text-right">{t('auth.full_name')}</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-green/40 rtl:right-3 rtl:left-auto" />
            <input
              type="text"
              required
              placeholder="e.g. Hamed Ali"
              className="w-full bg-black/60 border border-cyber-green/20 py-2 pl-10 pr-4 rtl:pr-10 rtl:pl-4 text-cyber-green focus:outline-none focus:border-cyber-green transition-all font-mono text-sm placeholder:text-cyber-green/10"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-mono uppercase mb-1 text-cyber-green/80 text-left rtl:text-right">{t('auth.operator_id')}</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-green/40 rtl:right-3 rtl:left-auto" />
            <input
              type="email"
              required
              placeholder="operator@dragonsploit.io"
              className="w-full bg-black/60 border border-cyber-green/20 py-2 pl-10 pr-4 rtl:pr-10 rtl:pl-4 text-cyber-green focus:outline-none focus:border-cyber-green transition-all font-mono text-sm placeholder:text-cyber-green/10"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-mono uppercase mb-1 text-cyber-green/80 text-left rtl:text-right">
            {t('auth.security_key')} <span className="text-cyber-green/40 leading-none lowercase">(Min 8 chars)</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-green/40 rtl:right-3 rtl:left-auto" />
            <input
              type="password"
              required
              className="w-full bg-black/60 border border-cyber-green/20 py-2 pl-10 pr-4 rtl:pr-10 rtl:pl-4 text-cyber-green focus:outline-none focus:border-cyber-green transition-all font-mono text-sm"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-2 bg-red-500/10 border border-red-500/40 text-red-500 text-[10px] font-mono uppercase text-center">
              [!] {error}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={isRegistering}
          className="w-full py-3 bg-cyber-green/10 border border-cyber-green text-cyber-green font-display font-bold uppercase tracking-widest hover:bg-cyber-green hover:text-black transition-all disabled:opacity-50"
        >
          {isRegistering ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : t('auth.create_account')}
        </button>
      </form>
    </div>
  );
};
