import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', label: 'EN', flag: '🇺🇸' },
    { code: 'ar', label: 'AR', flag: '🇸🇦' },
    { code: 'tr', label: 'TR', flag: '🇹🇷' },
  ];

  return (
    <div className="flex items-center gap-2 border border-cyber-green/20 px-2 py-1 rounded-sm bg-black/40">
      <Languages size={14} className="text-cyber-green/60" />
      <div className="flex gap-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className={`text-[10px] font-mono font-bold px-1 transition-all ${
              i18n.language.startsWith(lang.code)
                ? 'text-cyber-green border-b border-cyber-green'
                : 'text-cyber-green/30 hover:text-cyber-green/80'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
