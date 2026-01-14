import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Loader2, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
// import { authApi } from '@/shared/api/auth';

export const ForgotCredentialsForm = ({ onBack }: { onBack: () => void }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setError(null);

    try {
      // Mocking for now as backend doesn't have this yet
      // await authApi.forgotPassword(email);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSent(true);
    } catch (err: any) {
      setError(t('common.error') || 'System Error');
    } finally {
      setIsSending(false);
    }
  };

  if (isSent) {
    return (
      <div className="w-full max-w-md p-8 bg-black/40 backdrop-blur-xl border border-cyber-green/30 rounded-lg shadow-[0_0_50px_rgba(0,255,65,0.1)] text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-cyber-green/10 rounded-full border border-cyber-green">
            <ShieldCheck className="w-12 h-12 text-cyber-green animate-pulse" />
          </div>
        </div>
        <h2 className="text-2xl font-display font-bold text-cyber-green tracking-tighter uppercase mb-4">
          Request Logged
        </h2>
        <p className="text-cyber-green/60 text-xs font-mono mb-8 px-4 leading-relaxed">
          If an operator profile exists for <span className="text-white font-bold">{email}</span>, 
          recovery instructions have been dispatched via secure channel.
        </p>
        <button
          onClick={onBack}
          className="w-full py-3 border border-cyber-green text-cyber-green font-display font-bold uppercase tracking-widest hover:bg-cyber-green hover:text-black transition-all"
        >
          {t('auth.back_to_login')}
        </button>
      </div>
    );
  }

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
          {t('auth.forgot_creds').split('?')[0]} <span className="text-white">RECOVERY</span>
        </h2>
        <p className="text-cyber-green/60 text-[10px] font-mono mt-2 uppercase">
          Initiating secure credential reset protocol
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[10px] font-mono uppercase mb-2 text-cyber-green/80 text-left rtl:text-right">
            {t('auth.operator_id')}
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-green/40 rtl:right-3 rtl:left-auto" />
            <input
              type="email"
              required
              placeholder="operator@dragonsploit.io"
              className="w-full bg-black/60 border border-cyber-green/20 py-3 pl-10 pr-4 rtl:pr-10 rtl:pl-4 text-cyber-green focus:outline-none focus:border-cyber-green transition-all font-mono text-sm placeholder:text-cyber-green/10"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
          disabled={isSending}
          className="w-full py-4 bg-cyber-green/5 border border-cyber-green/40 text-cyber-green font-display font-bold uppercase tracking-widest hover:bg-cyber-green hover:text-black transition-all disabled:opacity-50"
        >
          {isSending ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Dispatch Recovery Signal'}
        </button>
      </form>
    </div>
  );
};
