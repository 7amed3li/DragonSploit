import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Settings as SettingsIcon, 
  Shield, 
  Database, 
  Key,
  Monitor,
  ChevronRight
} from 'lucide-react';
import { useAuthStore } from '@/features/auth/model/authStore';
import { useTranslation } from 'react-i18next';

const SettingsPage: React.FC = () => {
  const { user } = useAuthStore();
  const { t, i18n } = useTranslation();

  const currentLang = i18n.language;

  const sections = [
    {
      id: 'profile',
      title: t('settings.operator_profile'),
      icon: User,
      description: 'Personal identification and credentials',
      fields: [
        { label: 'Full Designation', value: user?.name || 'Unknown' },
        { label: 'Comm Channel (Email)', value: user?.email || 'N/A' },
        { label: 'Access Role', value: user?.role || 'OPERATOR' }
      ]
    },
    {
      id: 'system',
      title: t('settings.interface_config'),
      icon: Monitor,
      description: 'Adjust the tactical displays and localization',
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-black/40 border border-cyber-green/5 rounded-sm">
            <div>
              <p className="text-[10px] text-cyber-green/40 uppercase">System Language</p>
              <p className="text-xs text-white font-bold">{currentLang.toUpperCase()}</p>
            </div>
            <div className="flex gap-2">
              {['en', 'ar', 'tr'].map(lang => (
                <button
                  key={lang}
                  onClick={() => i18n.changeLanguage(lang)}
                  className={`px-3 py-1 text-[10px] font-mono border transition-all ${
                    currentLang.startsWith(lang)
                    ? 'bg-cyber-green/20 border-cyber-green text-cyber-green'
                    : 'border-cyber-green/10 text-cyber-green/40 hover:border-cyber-green/40'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'org',
      title: t('settings.org_data'),
      icon: Database,
      description: 'Central command and strategic node info',
      fields: [
        { label: 'Unit Identifier (OrgID)', value: user?.organizationId || 'unassigned' },
        { label: 'Deployment Region', value: 'Middle-East ME-0' }
      ]
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-display font-bold text-white tracking-tighter uppercase">
            {t('settings.system_settings').split(' ')[0]} <span className="text-cyber-green">{t('settings.system_settings').split(' ')[1]}</span>
          </h1>
          <p className="text-cyber-green/40 text-xs font-mono mt-2 uppercase tracking-widest flex items-center gap-2">
            <SettingsIcon size={14} /> {t('settings.global_tactical')} // Version 2.0.4-LTS
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {sections.map((section, idx) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-black/40 border border-cyber-green/10 rounded-sm overflow-hidden"
          >
            <div className="p-6 border-b border-cyber-green/10 bg-cyber-green/5 flex items-center gap-4">
               <div className="p-3 bg-black border border-cyber-green/20 rounded-sm text-cyber-green">
                  <section.icon size={20} />
               </div>
               <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">{section.title}</h3>
                  <p className="text-[10px] text-cyber-green/40 uppercase mt-0.5">{section.description}</p>
               </div>
            </div>

            <div className="p-6 space-y-4">
               {section.fields && section.fields.map(field => (
                 <div key={field.label} className="group cursor-default">
                    <p className="text-[10px] text-cyber-green/30 uppercase mb-1 flex items-center gap-2 group-hover:text-cyber-green/60 transition-colors">
                       <ChevronRight size={10} /> {field.label}
                    </p>
                    <div className="w-full bg-black/60 border border-cyber-green/10 p-3 text-xs text-white font-mono flex justify-between items-center group-hover:border-cyber-green/30 transition-all">
                       <span>{field.value}</span>
                       <Key size={12} className="text-cyber-green/20" />
                    </div>
                 </div>
               ))}
               {section.content}
            </div>
          </motion.div>
        ))}

        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 p-8 bg-cyber-red/5 border border-cyber-red/20 rounded-sm flex flex-col md:flex-row items-center gap-6"
        >
           <div className="p-4 bg-cyber-red/10 rounded-full border border-cyber-red/20">
              <Shield size={32} className="text-cyber-red animate-pulse" />
           </div>
           <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg font-bold text-cyber-red uppercase">{t('settings.danger_zone')}</h3>
              <p className="text-xs text-cyber-red/60 uppercase mt-1">High-risk administrative operations. Proceed with extreme caution.</p>
           </div>
           <div className="flex gap-4">
              <button className="px-6 py-2 border border-cyber-red/40 text-cyber-red text-[10px] font-mono hover:bg-cyber-red hover:text-black transition-all font-bold uppercase">
                 Reset Session
              </button>
              <button className="px-6 py-2 bg-cyber-red text-black text-[10px] font-mono hover:bg-white transition-all font-bold uppercase">
                 Terminate Account
              </button>
           </div>
        </motion.div>
      </div>

      {/* Retro decorative text at bottom */}
      <div className="flex justify-center pt-8">
         <p className="text-[9px] font-mono text-cyber-green/10 uppercase tracking-[0.5em] animate-pulse">
            -- DRAGONSPLOIT CRYPTOGRAPHIC CORE SECURE --
         </p>
      </div>
    </div>
  );
};

export default SettingsPage;
