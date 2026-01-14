import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Target, 
  ShieldAlert, 
  Settings, 
  LogOut, 
  Terminal as TerminalIcon,
  Activity
} from 'lucide-react';
import { useAuthStore } from '@/features/auth/model/authStore';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/features/language/ui/LanguageSwitcher';

const DashboardLayout: React.FC = () => {
  const { logout, user } = useAuthStore();
  const { t } = useTranslation();
  const location = useLocation();

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  const menuItems = [
    { icon: LayoutDashboard, label: t('common.dashboard'), path: '/' },
    { icon: Target, label: t('common.targets'), path: '/targets' },
    { icon: Activity, label: t('common.scans'), path: '/scans' },
    { icon: ShieldAlert, label: t('common.vulnerabilities'), path: '/vulnerabilities' },
    { icon: TerminalIcon, label: t('common.terminal'), path: '/terminal' },
    { icon: Settings, label: t('common.settings'), path: '/settings' },
  ];

  return (
    <div className="flex h-screen bg-cyber-black text-cyber-green font-mono overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-cyber-green/20 bg-black/40 backdrop-blur-md flex flex-col">
        <div className="p-6 border-b border-cyber-green/20">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="DS" className="w-8 h-8 mix-blend-screen" />
            <h1 className="font-display font-bold tracking-tighter text-lg">
              DRAGON<span className="text-white">SPLOIT</span>
            </h1>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-all duration-200 group ${
                location.pathname === item.path 
                ? 'bg-cyber-green/10 text-cyber-green border-l-4 border-cyber-green' 
                : 'text-cyber-green/40 hover:bg-cyber-green/5 hover:text-cyber-green'
              }`}
            >
              <item.icon size={20} className={location.pathname === item.path ? 'animate-pulse' : ''} />
              <span className="text-sm font-bold tracking-widest uppercase">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-cyber-green/20">
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-cyber-red/60 hover:text-cyber-red hover:bg-cyber-red/5 transition-all rounded-sm uppercase text-xs font-bold"
          >
            <LogOut size={18} />
            {t('common.logout')}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 border-b border-cyber-green/20 bg-black/20 flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyber-green animate-ping" />
              <span className="text-[10px] uppercase tracking-tighter opacity-60">System Online // Node: ME-01</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <LanguageSwitcher />
            <div className="text-right">
              <p className="text-[10px] uppercase opacity-40 leading-none">Signed as Operator</p>
              <p className="text-xs font-bold text-white">{user?.email}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-cyber-green/20 border border-cyber-green flex items-center justify-center font-display font-bold text-xs">
              {user ? getInitials(user.name) : '??'}
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-auto p-8 relative">
          {/* Subtle noise/grain overlay */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
