import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Terminal as TerminalIcon, 
  Clock, 
  Zap, 
  AlertTriangle,
  Globe,
  Cpu
} from 'lucide-react';
import { vulnerabilityApi } from '@/entities/vulnerability/api/vulnerabilityApi';
import { scanApi } from '@/entities/scan/api/scanApi';
import { targetApi } from '@/entities/target/api/targetApi';
import { useAuthStore } from '@/features/auth/model/authStore';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { generateTacticalReport } from '@/shared/lib/pdf/report-generator';

const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [telemetry, setTelemetry] = useState({
    cpu: 24.8,
    ram: 19.4,
    health: 99.9
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry({
        cpu: Number((20 + Math.random() * 10).toFixed(1)),
        ram: Number((18 + Math.random() * 5).toFixed(1)),
        health: Number((98 + Math.random() * 2).toFixed(1))
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Queries for real stats
  const { data: scans = [] } = useQuery({
    queryKey: ['scans', user?.organizationId],
    queryFn: () => scanApi.list(user!.organizationId),
    enabled: !!user?.organizationId
  });

  const { data: targets = [] } = useQuery({
    queryKey: ['targets', user?.organizationId],
    queryFn: () => targetApi.list(user!.organizationId),
    enabled: !!user?.organizationId
  });

  const { data: vulns = [] } = useQuery({
    queryKey: ['vulnerabilities', user?.organizationId],
    queryFn: () => vulnerabilityApi.list(user!.organizationId),
    enabled: !!user?.organizationId
  });

  const activeScansCount = scans.filter(s => s.status === 'RUNNING').length;

  const handleExport = () => {
    console.log('PDF_ENGINE :: Initializing tactical report generation...');
    console.log('EXPORT_DATA :: Context:', { operator: user?.name, org: user?.organizationId, scans: scans.length, vulns: vulns.length });
    
    try {
      generateTacticalReport({
        operatorName: user?.name || 'Unknown Operator',
        organizationId: user?.organizationId || 'DS-UNSET',
        timestamp: new Date().toLocaleString(),
        stats: {
          totalScans: scans.length,
          activeScans: activeScansCount,
          vulnerabilities: vulns.length,
          targets: targets.length
        },
        recentScans: scans.slice(0, 10),
        vulnerabilities: vulns.slice(0, 10)
      });
      console.log('PDF_ENGINE :: Success. Report dispatched to browser.');
    } catch (err) {
      console.error('PDF_ENGINE_FAILURE :: Critical disruption during document assembly:', err);
      alert('FAILED TO GENERATE REPORT: Check the operational log (console) for details.');
    }
  };

  const stats = [
    { label: t('dashboard.active_missions'), value: activeScansCount.toString().padStart(2, '0'), icon: Activity, color: 'text-cyber-green', trend: 'LIVE' },
    { label: t('dashboard.strategic_assets'), value: targets.length.toString(), icon: Globe, color: 'text-blue-400', trend: 'Stable' },
    { label: t('dashboard.system_health'), value: `${telemetry.health}%`, icon: Clock, color: 'text-purple-400', trend: 'Optimal' },
    { label: t('dashboard.detected_flaws'), value: vulns.length.toString().padStart(2, '0'), icon: AlertTriangle, color: 'text-cyber-red', trend: vulns.length > 0 ? '+New' : 'Zero' },
  ];

  const derivedLogs = scans.slice(0, 5).map(scan => ({
    id: scan.id,
    time: new Date(scan.createdAt).toLocaleTimeString(),
    msg: `MISSION_${scan.status} :: ${scan.target?.name || 'Unknown'}`,
    type: scan.status === 'RUNNING' ? 'info' : scan.status === 'COMPLETED' ? 'success' : 'warning'
  }));

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <header className="flex justify-between items-end">
        <div>
          <motion.h1 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-4xl font-display font-bold text-white tracking-tighter uppercase"
          >
            {t('dashboard.command_center').split(' ')[0]} <span className="text-cyber-green">{t('dashboard.command_center').split(' ')[1]}</span>
          </motion.h1>
          <p className="text-cyber-green/40 text-xs font-mono mt-2 uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
            {t('dashboard.strategic_overview')} // {t('dashboard.operational_status')}: {t('dashboard.status_nominal')}
          </p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleExport}
            className="px-4 py-2 border border-cyber-green/20 text-cyber-green/60 text-[10px] font-mono uppercase hover:bg-cyber-green/5 transition-all"
          >
            Export Report
          </button>
          <button 
            onClick={() => navigate('/targets')}
            className="px-6 py-2 bg-cyber-green/10 border border-cyber-green text-cyber-green text-[10px] font-mono uppercase hover:bg-cyber-green hover:text-black transition-all font-bold"
          >
            New Scan +
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-black/40 border border-cyber-green/10 p-6 rounded-sm relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-16 h-16 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity">
              <stat.icon size={64} />
            </div>
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 bg-black/60 border border-cyber-green/20 rounded-sm ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className="text-[10px] font-mono text-cyber-green/40 bg-cyber-green/5 px-2 py-1 rounded-sm">
                {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-[10px] font-mono text-cyber-green/40 uppercase mb-1 tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-display font-bold text-white">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Threat Map Placeholder */}
        <div className="lg:col-span-2 bg-black/20 border border-cyber-green/10 rounded-sm p-8 relative overflow-hidden min-h-[400px]">
          <div className="absolute top-4 left-4 z-10">
            <h3 className="text-xs font-mono font-bold text-cyber-green uppercase flex items-center gap-2">
              <Globe size={14} /> Global Threat Topology
            </h3>
          </div>
          
          {/* Holographic Circles Effect */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="w-[500px] h-[500px] border border-cyber-green/20 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute w-[300px] h-[300px] border border-cyber-green/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            {/* Radar Line */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute w-[250px] h-[1px] bg-gradient-to-r from-transparent to-cyber-green origin-left left-1/2"
            />
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <div className="text-cyber-green/10 font-display text-[120px] font-black select-none uppercase tracking-tighter -rotate-12">
              DragonSploit
            </div>
          </div>
          
          {/* Signal Intercept Overlay */}
          <div className="absolute bottom-4 right-4 text-right">
            <p className="text-[10px] font-mono text-cyber-green/40 uppercase">Satellite link active</p>
            <p className="text-[10px] font-mono text-white/40 uppercase">Coord: 25.276987, 55.296249</p>
          </div>
        </div>

        {/* Real-time Logs / Mission Status */}
        <div className="bg-black/40 border border-cyber-green/10 rounded-sm flex flex-col">
          <div className="p-4 border-b border-cyber-green/10 flex justify-between items-center bg-cyber-green/5">
            <h3 className="text-xs font-mono font-bold text-cyber-green uppercase flex items-center gap-2">
              <TerminalIcon size={14} /> {t('dashboard.mission_logs')}
            </h3>
            <span className="text-[9px] font-mono animate-pulse text-cyber-green">LIVE</span>
          </div>
          <div className="flex-1 p-4 font-mono text-[11px] space-y-3 overflow-hidden">
            {derivedLogs.map((log) => (
              <div key={log.id} className="flex gap-3 hover:bg-cyber-green/5 p-1 transition-colors group cursor-default">
                <span className="text-cyber-green/30">[{log.time}]</span>
                <span className={`
                  ${log.type === 'warning' ? 'text-cyber-red' : ''}
                  ${log.type === 'success' ? 'text-cyber-green' : ''}
                  ${log.type === 'info' ? 'text-blue-400' : ''}
                `}>
                  {log.msg}
                </span>
              </div>
            ))}
            {derivedLogs.length === 0 && (
              <div className="text-cyber-green/20 uppercase">No active or past mission records available.</div>
            )}
            <div className="pt-4 mt-4 border-t border-cyber-green/5">
              <div className="flex items-center gap-2 text-[10px] text-cyber-green/20 uppercase animate-pulse">
                <Loader2 size={10} className="animate-spin" /> {t('dashboard.waiting_data')}
              </div>
            </div>
          </div>
          <div className="p-3 bg-black/60 border-t border-cyber-green/10">
            <button className="w-full text-center text-[10px] uppercase font-bold py-2 border border-cyber-green/20 hover:border-cyber-green/60 transition-colors">
              Enter Full Terminal
            </button>
          </div>
        </div>
      </div>

      {/* System Resources Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-black/40 border border-cyber-green/10 flex items-center gap-6 group hover:border-cyber-green/30 transition-all">
          <div className="p-4 bg-cyber-green/5 rounded-full text-cyber-green group-hover:scale-110 transition-transform">
            <Cpu size={24} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-mono text-cyber-green/60 uppercase">Node-Central Load</span>
              <span className="text-xs font-bold">{telemetry.cpu}%</span>
            </div>
            <div className="w-full h-1 bg-cyber-green/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${telemetry.cpu}%` }}
                className="h-full bg-cyber-green shadow-[0_0_10px_#00ff41]" 
              />
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-black/40 border border-cyber-green/10 flex items-center gap-6 group hover:border-cyber-green/30 transition-all">
          <div className="p-4 bg-blue-400/5 rounded-full text-blue-400 group-hover:scale-110 transition-transform">
            <Zap size={24} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-mono text-blue-400/60 uppercase">Memory Allocation</span>
              <span className="text-xs font-bold">{(telemetry.ram * 0.32).toFixed(1)} / 32 GB</span>
            </div>
            <div className="w-full h-1 bg-blue-400/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${telemetry.ram}%` }}
                className="h-full bg-blue-400 shadow-[0_0_10px_#60a5fa]" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Loader2 = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export default DashboardPage;
