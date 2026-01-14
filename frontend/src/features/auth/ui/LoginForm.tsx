import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { authApi } from '@/shared/api/auth';
import { useAuthStore } from '@/features/auth/model/authStore';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const LoginForm = ({ 
  onSignUp, 
  onForgot 
}: { 
  onSignUp: () => void;
  onForgot: () => void;
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAccessing, setIsAccessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setAuth = useAuthStore(state => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAccessing(true);
    setError(null);
    
    try {
      const { data } = await authApi.login({ email, password });
      setAuth(data.user, data.accessToken);
      // localStorage backup for the interceptor
      localStorage.setItem('dragonsploit-auth-token', data.accessToken);
      // console.log('Login successful');
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Access Denied: Invalid Credentials');
    } finally {
      setIsAccessing(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-black/40 backdrop-blur-xl border border-cyber-green/30 rounded-lg shadow-[0_0_50px_rgba(0,255,65,0.1)] relative overflow-hidden">
      {/* Decorative scanner line */}
      <motion.div 
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        className="absolute left-0 w-full h-[1px] bg-cyber-green/40 z-10 pointer-events-none shadow-[0_0_10px_#00ff41]"
      />

      <div className="flex flex-col items-center mb-8">
        <div className="relative group">
          <motion.div 
            animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 bg-cyber-green/20 blur-2xl rounded-full"
          />
          <img 
            src="/logo.png" 
            alt="DragonSploit Logo" 
            className="w-28 h-28 relative z-10 drop-shadow-[0_0_20px_rgba(0,255,65,0.4)] mix-blend-screen brightness-110 object-contain"
            style={{ 
              clipPath: 'circle(48% at 50% 50%)',
              filter: 'contrast(1.2) saturate(1.2)'
            }}
          />
        </div>
        <h2 className="text-3xl font-display font-bold text-cyber-green tracking-tighter uppercase mt-4 text-center">
          {t('auth.gateway')}
        </h2>
        <p className="text-cyber-green/60 text-xs font-mono mt-2 text-center uppercase">
          {t('auth.auth_required')} // SYSTEM ID: DS-ORC-01
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-mono uppercase mb-2 text-cyber-green/80 flex items-center">
             <span className="inline-block mr-2 text-cyber-green rtl:ml-2 rtl:mr-0">{">"}</span> {t('auth.operator_id')}
          </label>
          <div className="relative">
            <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-green/40 rtl:right-3 rtl:left-auto" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/60 border border-cyber-green/30 py-3 pl-10 pr-4 rtl:pr-10 rtl:pl-4 text-cyber-green focus:outline-none focus:border-cyber-green focus:ring-1 focus:ring-cyber-green transition-all font-mono placeholder:text-cyber-green/20"
              placeholder="operator@dragonsploit.io"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase mb-2 text-cyber-green/80 flex items-center">
            <span className="inline-block mr-2 text-cyber-green rtl:ml-2 rtl:mr-0">{">"}</span> {t('auth.security_key')}
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-green/40 rtl:right-3 rtl:left-auto" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/60 border border-cyber-green/30 py-3 pl-10 pr-12 rtl:pr-10 rtl:pl-12 text-cyber-green focus:outline-none focus:border-cyber-green focus:ring-1 focus:ring-cyber-green transition-all font-mono"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-cyber-green/40 hover:text-cyber-green transition-colors rtl:left-3 rtl:right-auto"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3 bg-red-500/10 border border-red-500/50 text-red-500 text-[10px] font-mono uppercase text-center"
            >
              [ERROR] :: {error}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={isAccessing}
          className="group relative w-full overflow-hidden py-4 bg-cyber-green/10 border border-cyber-green text-cyber-green font-display font-bold uppercase tracking-widest hover:bg-cyber-green hover:text-black transition-all duration-300 active:scale-95 disabled:opacity-50"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isAccessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {t('auth.validating')}
              </>
            ) : (
              t('auth.initiate_login')
            )}
          </span>
          <motion.div 
            whileHover={{ left: '100%' }}
            initial={{ left: '-100%' }}
            className="absolute top-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
          />
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-cyber-green/10 flex justify-between gap-4">
        <button 
          onClick={onForgot}
          type="button" 
          className="text-[10px] uppercase font-mono text-cyber-green/40 hover:text-cyber-green transition-colors"
        >
          {t('auth.forgot_creds')}
        </button>
        <button 
          onClick={onSignUp}
          type="button" 
          className="text-[10px] uppercase font-mono text-cyber-green/40 hover:text-cyber-green transition-colors"
        >
          {t('auth.new_operator')}
        </button>
      </div>
    </div>
  );
};
