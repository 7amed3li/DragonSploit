import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Bug, 
  Eye, 
  CheckCircle,
  ExternalLink,
  Search,
  Loader2
} from 'lucide-react';
import { vulnerabilityApi } from '@/entities/vulnerability/api/vulnerabilityApi';
import { useAuthStore } from '@/features/auth/model/authStore';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import type { VulnerabilitySeverity, Vulnerability } from '@/entities/vulnerability/model/types';

const VulnerabilitiesPage: React.FC = () => {
  const { user } = useAuthStore();
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<VulnerabilitySeverity | 'ALL'>('ALL');
  const [selectedVuln, setSelectedVuln] = useState<Vulnerability | null>(null);

  // Fetch Vulnerabilities
  const { data: vulnerabilities = [], isLoading } = useQuery({
    queryKey: ['vulnerabilities', user?.organizationId],
    queryFn: () => vulnerabilityApi.list(user!.organizationId),
    enabled: !!user?.organizationId,
    refetchInterval: 10000, // Sync every 10 seconds
  });

  const getSeverityColor = (severity: VulnerabilitySeverity) => {
    switch (severity) {
      case 'CRITICAL': return 'text-red-600 border-red-600/20 bg-red-600/5';
      case 'HIGH': return 'text-orange-500 border-orange-500/20 bg-orange-500/5';
      case 'MEDIUM': return 'text-yellow-500 border-yellow-500/20 bg-yellow-500/5';
      case 'LOW': return 'text-blue-400 border-blue-400/20 bg-blue-400/5';
      default: return 'text-cyber-green border-cyber-green/20 bg-cyber-green/5';
    }
  };

  const filteredVulns = vulnerabilities.filter(v => {
    const matchesSearch = v.description.toLowerCase().includes(search.toLowerCase()) || 
                         v.type.toLowerCase().includes(search.toLowerCase());
    const matchesSeverity = selectedSeverity === 'ALL' || v.severity === selectedSeverity;
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="space-y-8 pb-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-display font-bold text-white tracking-tighter uppercase">
            {t('vulnerabilities.intel_feed').split(' ')[0]} <span className="text-cyber-red">{t('vulnerabilities.intel_feed').split(' ')[1]}</span>
          </h1>
          <p className="text-cyber-red/40 text-xs font-mono mt-2 uppercase tracking-widest flex items-center gap-2">
            {t('vulnerabilities.threat_landscape')} // Detected Flaws: {vulnerabilities.length}
          </p>
        </div>
      </header>

      {/* Control Bar */}
      <div className="flex gap-4 items-center bg-black/40 border border-cyber-red/10 p-4 rounded-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-red/40" />
          <input 
            type="text"
            placeholder="Filter by type or description..."
            className="w-full bg-black/60 border border-cyber-red/20 py-2 pl-10 pr-4 text-cyber-red font-mono text-xs focus:outline-none focus:border-cyber-red transition-all placeholder:text-cyber-red/20"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="h-8 w-[1px] bg-cyber-red/10" />
        <div className="flex gap-2">
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map(sev => (
            <button 
              key={sev}
              onClick={() => setSelectedSeverity(sev as any)}
              className={`px-3 py-1 text-[10px] font-mono border transition-all uppercase ${
                selectedSeverity === sev 
                ? 'bg-cyber-red/20 border-cyber-red text-cyber-red font-bold' 
                : 'text-cyber-red/40 border-cyber-red/10 hover:border-cyber-red/40 hover:text-cyber-red'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Vulnerabilities List */}
      {isLoading ? (
        <div className="h-64 flex flex-col items-center justify-center gap-4 text-cyber-red/20 font-mono text-xs">
          <Loader2 className="animate-spin" size={32} />
          DECRYPTING THREAT INTELLIGENCE...
        </div>
      ) : filteredVulns.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center gap-4 text-cyber-green/20 font-mono text-xs bg-cyber-green/5 border border-cyber-green/10 rounded-sm">
          <ShieldCheck size={48} className="text-cyber-green/40" />
          SYSTEM SECURE. NO VULNERABILITIES DETECTED IN MONITORING ZONE.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredVulns.map((vuln, i) => (
            <motion.div
              key={vuln.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`border rounded-sm overflow-hidden bg-black/40 group hover:bg-black/60 transition-all ${getSeverityColor(vuln.severity).split(' ')[1]}`}
            >
              <div className="flex items-center p-4 gap-4">
                <div className={`p-2 rounded-sm border ${getSeverityColor(vuln.severity)}`}>
                  {vuln.severity === 'CRITICAL' ? <AlertTriangle size={20} /> : <Bug size={20} />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display font-bold text-white uppercase tracking-tight group-hover:text-cyber-red transition-colors">
                      {vuln.type.replace(/_/g, ' ')}
                    </h3>
                    <span className={`text-[8px] font-mono px-2 py-0.5 border rounded-full uppercase font-bold ${getSeverityColor(vuln.severity)}`}>
                      {vuln.severity}
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-white/40 mt-1 uppercase italic">
                    Detected on: {vuln.scan?.target?.name} ({vuln.scan?.target?.url})
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[10px] font-mono text-white/20 uppercase mb-1">Found at</p>
                  <p className="text-[10px] font-mono text-white/60">{new Date(vuln.foundAt).toLocaleString()}</p>
                </div>

                <button 
                  onClick={() => setSelectedVuln(vuln)}
                  className="p-2 ml-4 bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all"
                >
                  <Eye size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Vulnerability Detail Modal */}
      <AnimatePresence>
        {selectedVuln && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVuln(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl bg-black border border-cyber-red/30 p-8 shadow-[0_0_100px_rgba(255,0,0,0.1)] max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                     <span className={`text-[10px] font-mono px-2 py-0.5 border rounded-full uppercase font-bold ${getSeverityColor(selectedVuln.severity)}`}>
                      {selectedVuln.severity}
                    </span>
                    <span className="text-white/20 text-[10px] font-mono tracking-widest uppercase">ID: {selectedVuln.id}</span>
                  </div>
                  <h2 className="text-3xl font-display font-bold text-cyber-red tracking-tighter uppercase">
                    {selectedVuln.type.replace(/_/g, ' ')}
                  </h2>
                </div>
                <button 
                  onClick={() => setSelectedVuln(null)}
                  className="p-2 text-cyber-red/40 hover:text-cyber-red transition-colors"
                >
                  <CheckCircle size={24} />
                </button>
              </div>

              <div className="space-y-6">
                 <div>
                    <h4 className="text-[10px] font-mono text-cyber-red/60 uppercase mb-2 border-b border-cyber-red/10 pb-1">Description</h4>
                    <p className="text-sm text-white/80 leading-relaxed font-mono">
                      {selectedVuln.description}
                    </p>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/60 border border-cyber-red/10 p-3 rounded-sm">
                      <p className="text-[9px] font-mono text-cyber-red/40 uppercase mb-1">Target Asset</p>
                      <p className="text-xs font-bold text-white uppercase">{selectedVuln.scan?.target?.name}</p>
                    </div>
                    <div className="bg-black/60 border border-cyber-red/10 p-3 rounded-sm">
                      <p className="text-[9px] font-mono text-cyber-red/40 uppercase mb-1">Associated Mission</p>
                      <p className="text-xs font-bold text-white uppercase">Scan #{selectedVuln.scanId.substring(0,8)}</p>
                    </div>
                 </div>

                 <div>
                    <h4 className="text-[10px] font-mono text-cyber-red/60 uppercase mb-2 border-b border-cyber-red/10 pb-1">Technical Proof (PoC)</h4>
                    <div className="bg-cyber-red/5 border border-cyber-red/20 p-4 rounded-sm">
                      <code className="text-[11px] font-mono text-cyber-red break-all whitespace-pre-wrap">
                        {selectedVuln.proof}
                      </code>
                    </div>
                 </div>

                 <div className="pt-4 flex gap-4">
                    <button className="flex-1 py-3 bg-cyber-red/10 border border-cyber-red/40 text-cyber-red font-mono font-bold uppercase tracking-widest hover:bg-cyber-red hover:text-black transition-all flex items-center justify-center gap-2">
                       <ExternalLink size={16} /> Generate Exploit Payload
                    </button>
                    <button className="px-6 py-3 border border-white/20 text-white/40 font-mono font-bold uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all">
                       Mark as Fixed
                    </button>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VulnerabilitiesPage;
