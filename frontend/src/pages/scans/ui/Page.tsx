import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Play, 
  StopCircle,
  Loader2,
  RefreshCcw,
  Target as TargetIcon,
  ChevronRight
} from 'lucide-react';
import { scanApi } from '@/entities/scan/api/scanApi';
import { useAuthStore } from '@/features/auth/model/authStore';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import type { ScanStatus } from '@/entities/scan/model/types';

const ScansPage: React.FC = () => {
  const queryClient = useQueryClient(); // Add this
  const { user } = useAuthStore();
  const { t } = useTranslation();

  // Cancel Scan Mutation
  const cancelMutation = useMutation({
    mutationFn: (scanId: string) => scanApi.cancel(scanId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scans'] });
    },
  });

  // Fetch Scans with polling
  const { data: scans = [], isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['scans', user?.organizationId],
    queryFn: () => scanApi.list(user!.organizationId),
    enabled: !!user?.organizationId,
    refetchInterval: 5000, // Sync every 5 seconds
  });

  const getStatusColor = (status: ScanStatus) => {
    switch (status) {
      case 'RUNNING': return 'text-cyber-green';
      case 'PENDING': return 'text-blue-400';
      case 'COMPLETED': return 'text-purple-400';
      case 'FAILED': return 'text-cyber-red';
      case 'CANCELED': return 'text-white/40';
      default: return 'text-white/40';
    }
  };

  const getStatusIcon = (status: ScanStatus) => {
    switch (status) {
      case 'RUNNING': return <Activity className="w-4 h-4 animate-pulse" />;
      case 'PENDING': return <Clock className="w-4 h-4" />;
      case 'COMPLETED': return <CheckCircle2 className="w-4 h-4" />;
      case 'FAILED': return <AlertCircle className="w-4 h-4" />;
      case 'CANCELED': return <StopCircle className="w-4 h-4" />;
      default: return <StopCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-display font-bold text-white tracking-tighter uppercase">
            {t('scans.mission_control').split(' ')[0]} <span className="text-cyber-green">{t('scans.mission_control').split(' ')[1]}</span>
          </h1>
          <p className="text-cyber-green/40 text-xs font-mono mt-2 uppercase tracking-widest flex items-center gap-2">
            {t('scans.operational_intel')} // {t('scans.active_threads')}: {scans.filter(s => s.status === 'RUNNING').length}
          </p>
        </div>
        <button 
          onClick={() => refetch()}
          disabled={isRefetching}
          className="p-3 border border-cyber-green/20 text-cyber-green/60 hover:text-cyber-green hover:border-cyber-green transition-all"
          title="Manual Sync"
        >
          <RefreshCcw size={18} className={isRefetching ? 'animate-spin' : ''} />
        </button>
      </header>

      {/* Scans Table/List */}
      <div className="bg-black/40 border border-cyber-green/10 rounded-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-cyber-green/20 bg-cyber-green/5 text-[10px] font-mono text-cyber-green uppercase font-bold tracking-widest">
          <div className="col-span-4">{t('scans.op_target')}</div>
          <div className="col-span-2">{t('scans.exec_status')}</div>
          <div className="col-span-2 text-center">{t('scans.depth')}</div>
          <div className="col-span-2">{t('scans.timestamp')}</div>
          <div className="col-span-2 text-right">{t('common.actions')}</div>
        </div>

        {isLoading ? (
          <div className="p-20 flex flex-col items-center justify-center gap-4 text-cyber-green/20 font-mono text-xs">
            <Loader2 className="animate-spin text-cyber-green" size={40} />
            {t('common.loading')}
          </div>
        ) : scans.length === 0 ? (
          <div className="p-20 text-center text-cyber-green/20 font-mono text-xs">
            NO ACTIVE MISSIONS LOGGED IN THIS QUADRANT.
          </div>
        ) : (
          <div className="divide-y divide-cyber-green/5">
            {scans.map((scan, i) => (
              <motion.div 
                key={scan.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-cyber-green/5 transition-colors group"
              >
                <div className="col-span-4 flex items-center gap-3">
                  <div className="p-2 bg-black/60 border border-cyber-green/20 rounded-sm text-cyber-green/40 group-hover:text-cyber-green transition-colors">
                    <TargetIcon size={16} />
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-bold text-white group-hover:text-cyber-green transition-colors uppercase truncate">
                      {scan.target?.name || 'Unknown Target'}
                    </p>
                    <p className="text-[9px] font-mono text-cyber-green/40 truncate">
                      ID: {scan.id.substring(0, 12)}...
                    </p>
                  </div>
                </div>

                <div className="col-span-2 flex items-center gap-2">
                  <span className={`${getStatusColor(scan.status)}`}>
                    {getStatusIcon(scan.status)}
                  </span>
                  <span className={`text-[10px] font-mono font-bold uppercase ${getStatusColor(scan.status)}`}>
                    {scan.status}
                  </span>
                </div>

                <div className="col-span-2">
                  <div className="w-full h-1 bg-cyber-green/5 rounded-full overflow-hidden relative">
                    {scan.status === 'RUNNING' && !scan.progress ? (
                         // Indeterminate Loading State
                         <motion.div 
                           initial={{ x: '-100%' }}
                           animate={{ x: '100%' }}
                           transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                           className={`h-full w-1/3 ${getStatusColor(scan.status).replace('text-', 'bg-')} shadow-[0_0_10px_currentColor]`}
                         />
                    ) : (
                        // Determined Progress or Static State
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: scan.status === 'COMPLETED' ? '100%' : `${scan.progress || 0}%` }}
                          className={`h-full ${getStatusColor(scan.status).replace('text-', 'bg-')} shadow-[0_0_10px_currentColor]`}
                        />
                    )}
                  </div>
                  <p className="text-[9px] font-mono text-right text-cyber-green/60 mt-1">
                    {scan.status === 'RUNNING' && scan.progress == null ? 'ANALYZING...' : `${scan.status === 'COMPLETED' ? 100 : (scan.progress ?? 0)}%`}
                  </p>
                </div>

                <div className="col-span-2">
                  <p className="text-[10px] font-mono text-cyber-green/40">
                    {new Date(scan.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-[10px] font-mono text-white/40">
                    {new Date(scan.createdAt).toLocaleTimeString()}
                  </p>
                </div>

                <div className="col-span-2 text-right flex justify-end gap-2">
                  {scan.status === 'COMPLETED' ? (
                    <button className="px-3 py-1 bg-purple-500/10 border border-purple-500/40 text-purple-400 text-[10px] font-mono font-bold uppercase hover:bg-purple-500 hover:text-black transition-all flex items-center gap-1">
                      Report <ChevronRight size={12} />
                    </button>
                  ) : scan.status === 'RUNNING' || scan.status === 'PENDING' ? (
                    <button 
                      onClick={() => cancelMutation.mutate(scan.id)}
                      disabled={cancelMutation.isPending}
                      className="p-1.5 border border-cyber-red/20 text-cyber-red/40 hover:bg-cyber-red/10 hover:text-cyber-red hover:border-cyber-red transition-all disabled:opacity-50" 
                      title="Terminate Operation"
                    >
                      {cancelMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <StopCircle size={16} />}
                    </button>
                  ) : (
                    <button className="p-1.5 border border-cyber-green/20 text-cyber-green/40 hover:bg-cyber-green/10 hover:text-cyber-green hover:border-cyber-green transition-all" title="Restart">
                      <Play size={16} />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Analytics Preview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-black/40 border border-cyber-green/10 rounded-sm">
          <p className="text-[10px] font-mono text-cyber-green/40 uppercase mb-2">Payload Success Rate</p>
          <div className="flex items-end gap-2">
            <h4 className="text-3xl font-display font-bold text-white">84.2%</h4>
            <span className="text-cyber-green text-[10px] font-mono mb-1">▲ 2.4%</span>
          </div>
        </div>
        <div className="p-6 bg-black/40 border border-cyber-green/10 rounded-sm">
          <p className="text-[10px] font-mono text-cyber-red/40 uppercase mb-2">Average Vulnerability Depth</p>
          <div className="flex items-end gap-2">
            <h4 className="text-3xl font-display font-bold text-white">4.2</h4>
            <span className="text-cyber-red text-[10px] font-mono mb-1">▼ High Risk</span>
          </div>
        </div>
        <div className="p-6 bg-black/40 border border-cyber-green/10 rounded-sm">
          <p className="text-[10px] font-mono text-blue-400/40 uppercase mb-2">Data Processed (Current Session)</p>
          <div className="flex items-end gap-2">
            <h4 className="text-3xl font-display font-bold text-white">12.8 GB</h4>
            <span className="text-blue-400 text-[10px] font-mono mb-1">Nominal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScansPage;
