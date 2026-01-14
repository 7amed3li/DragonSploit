import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoginForm } from '@/features/auth/ui/LoginForm';
import { RegisterForm } from '@/features/auth/ui/RegisterForm';
import { ForgotCredentialsForm } from '@/features/auth/ui/ForgotCredentialsForm';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/features/language/ui/LanguageSwitcher';

const LoginPage: React.FC = () => {
  const [view, setView] = useState<'login' | 'register' | 'forgot'>('login');
  const { t } = useTranslation();
  return (
    <div className="min-h-screen w-full bg-cyber-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Matrix/Grid Effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(rgba(0,255,65,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
      
      {/* Radial Depth Aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,10,1)_80%)]" />

      {/* Floating 3D Elements Placeholder (Particles) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.5
            }}
            animate={{ 
              y: [null, Math.random() * -100 - 50],
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              duration: Math.random() * 10 + 5, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-[2px] h-[2px] bg-cyber-green shadow-[0_0_10px_#00ff41]"
          />
        ))}
      </div>

      {/* Brand Watermark */}
      <div className="absolute top-8 left-8 flex items-center gap-4 group">
        <div className="relative">
          <img 
            src="/logo.png" 
            alt="DragonSploit" 
            className="w-10 h-10 drop-shadow-[0_0_8px_rgba(0,255,65,0.3)] transition-all group-hover:drop-shadow-[0_0_15px_rgba(0,255,65,0.6)] mix-blend-screen" 
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-display font-bold text-cyber-green tracking-tighter leading-none">
            DRAGON<span className="text-white">SPLOIT</span>
          </h1>
          <p className="text-[10px] font-mono text-cyber-green/40 uppercase">v2.0 // {t('auth.auth_required')}</p>
        </div>
        <LanguageSwitcher />
      </div>

      {/* Main Form Holder */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="z-20 w-full flex justify-center"
      >
        <AnimatePresence mode="wait">
          {view === 'login' ? (
            <motion.div
              key="login"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LoginForm 
                onSignUp={() => setView('register')} 
                onForgot={() => setView('forgot')}
              />
            </motion.div>
          ) : view === 'register' ? (
            <motion.div
              key="register"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <RegisterForm onBack={() => setView('login')} />
            </motion.div>
          ) : (
            <motion.div
              key="forgot"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <ForgotCredentialsForm onBack={() => setView('login')} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Footer Info */}
      <div className="absolute bottom-6 w-full flex justify-center gap-12 text-[10px] font-mono text-cyber-green/20 uppercase tracking-widest">
        <span>{t('dashboard.operational_status')}: {t('dashboard.status_nominal')}</span>
        <span>Secure Protocol: AES-256-GCM</span>
      </div>
    </div>
  );
};

export default LoginPage;
