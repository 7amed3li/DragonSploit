import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Globe, 
  Trash2, 
  Play, 
  Loader2,
  X,
  Zap,
  Activity,
  Target
} from 'lucide-react';
import { targetApi } from '@/entities/target/api/targetApi';
import { scanApi } from '@/entities/scan/api/scanApi'; // New Import
import { useAuthStore } from '@/features/auth/model/authStore';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom'; // New Import
import { useTranslation } from 'react-i18next';

const TargetsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMissionModalOpen, setIsMissionModalOpen] = useState(false); // New State
  const [selectedTargetId, setSelectedTargetId] = useState<string | null>(null); // New State
  const [newTarget, setNewTarget] = useState({ name: '', url: '' });

  // Scan Logic
  const scanMutation = useMutation({
    mutationFn: (payload: { targetId: string, profile: 'lightning' | 'balanced' | 'deep' }) => 
      scanApi.create(payload),
    onSuccess: () => {
      navigate('/scans');
    },
  });

  // Fetch Targets
  const { data: targets = [], isLoading } = useQuery({
    queryKey: ['targets', user?.organizationId],
    queryFn: () => targetApi.list(user!.organizationId),
    enabled: !!user?.organizationId,
  });

  // Create Target Mutation
  const createMutation = useMutation({
    mutationFn: (payload: { name: string; url: string; organizationId: string }) => 
      targetApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['targets'] });
      setIsModalOpen(false);
      setNewTarget({ name: '', url: '' });
    },
  });

  // Delete Target Mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => targetApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['targets'] });
    },
  });

  const filteredTargets = targets.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.url.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddTarget = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.organizationId) return;
    createMutation.mutate({ ...newTarget, organizationId: user.organizationId });
  };

  return (
    <div className="space-y-8 pb-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-display font-bold text-white tracking-tighter uppercase">
            {t('targets.inventory').split(' ')[0]} <span className="text-cyber-green">{t('targets.inventory').split(' ')[1]}</span>
          </h1>
          <p className="text-cyber-green/40 text-xs font-mono mt-2 uppercase tracking-widest flex items-center gap-2">
            {t('targets.operational_intelligence')} // Total Nodes: {targets.length}
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 bg-cyber-green/10 border border-cyber-green text-cyber-green text-[10px] font-mono uppercase hover:bg-cyber-green hover:text-black transition-all font-bold flex items-center gap-2"
        >
          <Plus size={14} /> {t('targets.add_target')}
        </button>
      </header>

      {/* Control Bar */}
      <div className="flex gap-4 items-center bg-black/40 border border-cyber-green/10 p-4 rounded-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-green/40" />
          <input 
            type="text"
            placeholder={t('common.search')}
            className="w-full bg-black/60 border border-cyber-green/20 py-2 pl-10 pr-4 text-cyber-green font-mono text-xs focus:outline-none focus:border-cyber-green transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="h-8 w-[1px] bg-cyber-green/10" />
        <div className="flex gap-2">
          {['ALL', 'CLEAN', 'ACTIVE', 'VULNERABLE'].map(filter => (
            <button key={filter} className="px-3 py-1 text-[10px] font-mono text-cyber-green/40 border border-cyber-green/10 hover:border-cyber-green/40 hover:text-cyber-green transition-all uppercase">
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Targets Grid */}
      {isLoading ? (
        <div className="h-64 flex flex-col items-center justify-center gap-4 text-cyber-green/40 font-mono text-xs">
          <Loader2 className="animate-spin" size={32} />
          RECALLING ASSETS FROM ENCRYPTED STORAGE...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredTargets.map((target, i) => (
              <motion.div
                key={target.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                className="bg-black/40 border border-cyber-green/10 rounded-sm p-5 hover:border-cyber-green/30 transition-all group relative overflow-hidden"
              >
                {/* Status Indicator */}
                <div className="absolute top-0 right-0 p-2">
                   <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-cyber-green rounded-full animate-pulse shadow-[0_0_5px_#00ff41]" />
                      <span className="text-[8px] font-mono text-cyber-green/60 uppercase">Operational</span>
                   </div>
                </div>

                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-cyber-green/5 border border-cyber-green/20 rounded-sm text-cyber-green">
                    <Globe size={24} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white uppercase tracking-tight leading-tight group-hover:text-cyber-green transition-colors">
                      {target.name}
                    </h3>
                    <p className="text-[10px] font-mono text-cyber-green/40 truncate max-w-[200px] mt-1">
                      {target.url}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-black/40 border border-cyber-green/5 p-2 rounded-sm text-center">
                    <p className="text-[8px] font-mono text-cyber-green/30 uppercase mb-1">Scans Run</p>
                    <p className="text-lg font-display font-bold text-white">0</p>
                  </div>
                  <div className="bg-black/40 border border-cyber-green/5 p-2 rounded-sm text-center">
                    <p className="text-[8px] font-mono text-cyber-green/30 uppercase mb-1">Risk Level</p>
                    <p className="text-lg font-display font-bold text-blue-400">SAFE</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    disabled={scanMutation.isPending}
                    onClick={() => {
                        setSelectedTargetId(target.id);
                        setIsMissionModalOpen(true);
                    }}
                    className="flex-1 bg-cyber-green/10 border border-cyber-green/40 text-cyber-green py-2 text-[10px] font-mono font-bold uppercase transition-all hover:bg-cyber-green hover:text-black flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {scanMutation.isPending ? <Loader2 size={12} className="animate-spin" /> : <Play size={12} fill="currentColor" />}
                    {t('targets.launch_mission')}
                  </button>
                  <button 
                    onClick={() => deleteMutation.mutate(target.id)}
                    className="p-2 border border-cyber-red/20 text-cyber-red/40 hover:bg-cyber-red/10 hover:text-cyber-red hover:border-cyber-red transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Add Target Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-black border border-cyber-green/30 p-8 shadow-[0_0_100px_rgba(0,255,65,0.1)]"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-cyber-green/40 hover:text-cyber-green transition-colors"
              >
                <X size={20} />
              </button>

              <div className="mb-6">
                <h2 className="text-2xl font-display font-bold text-cyber-green tracking-tighter uppercase">
                  {t('targets.add_target').split(' ')[0]} <span className="text-white">{t('targets.add_target').split(' ').slice(1).join(' ')}</span>
                </h2>
                <p className="text-cyber-green/40 text-[10px] font-mono mt-1 uppercase">Adding strategic node to the network</p>
              </div>

              <form onSubmit={handleAddTarget} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase mb-1 text-cyber-green/60">{t('targets.target_name')}</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Master E-commerce API"
                    className="w-full bg-black border border-cyber-green/20 py-2 px-4 text-cyber-green font-mono text-sm focus:outline-none focus:border-cyber-green transition-all"
                    value={newTarget.name}
                    onChange={e => setNewTarget({ ...newTarget, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase mb-1 text-cyber-green/60">{t('targets.target_url')}</label>
                  <input 
                    type="url"
                    required
                    placeholder="https://target-system.com"
                    className="w-full bg-black border border-cyber-green/20 py-2 px-4 text-cyber-green font-mono text-sm focus:outline-none focus:border-cyber-green transition-all"
                    value={newTarget.url}
                    onChange={e => setNewTarget({ ...newTarget, url: e.target.value })}
                  />
                </div>

                <div className="pt-4">
                  <button 
                    disabled={createMutation.isPending}
                    className="w-full py-4 bg-cyber-green/10 border border-cyber-green text-cyber-green font-display font-bold uppercase tracking-widest hover:bg-cyber-green hover:text-black transition-all disabled:opacity-50"
                  >
                    {createMutation.isPending ? <Loader2 size={20} className="animate-spin mx-auto" /> : t('targets.initialize')}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mission Selector Modal */}
      <AnimatePresence>
        {isMissionModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMissionModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-black border border-cyber-green/30 p-8 shadow-[0_0_100px_rgba(0,255,65,0.1)]"
            >
                <div className="mb-8 border-b border-cyber-green/10 pb-4">
                    <h2 className="text-2xl font-display font-bold text-white tracking-tighter uppercase">
                        {t('missions.select_title').split(' ')[0]} <span className="text-cyber-green">{t('missions.select_title').split(' ').slice(1).join(' ')}</span>
                    </h2>
                    <p className="text-cyber-green/40 text-[10px] font-mono mt-1 uppercase">Define the tactical parameters for this operation</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { id: 'lightning', icon: Zap, color: 'text-yellow-400' },
                        { id: 'balanced', icon: Activity, color: 'text-cyber-green' },
                        { id: 'deep', icon: Target, color: 'text-cyber-red' }
                    ].map((profile) => (
                        <button
                            key={profile.id}
                            onClick={() => {
                                if (selectedTargetId) {
                                    scanMutation.mutate({ targetId: selectedTargetId, profile: profile.id as any });
                                    setIsMissionModalOpen(false);
                                }
                            }}
                            className="group p-6 bg-black/40 border border-cyber-green/10 hover:border-cyber-green/60 transition-all text-left relative overflow-hidden"
                        >
                            <div className={`p-3 bg-black/60 border border-cyber-green/20 rounded-sm w-fit mb-4 ${profile.color} group-hover:scale-110 transition-transform`}>
                                <profile.icon size={20} />
                            </div>
                            <h3 className="font-display font-bold text-white uppercase mb-2 group-hover:text-cyber-green transition-colors">
                                {t(`missions.${profile.id}`)}
                            </h3>
                            <p className="text-[10px] font-mono text-cyber-green/40 uppercase leading-relaxed">
                                {t(`missions.${profile.id}_desc`)}
                            </p>
                            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Play size={10} className="text-cyber-green" fill="currentColor" />
                            </div>
                        </button>
                    ))}
                </div>

                <div className="mt-8 pt-4 border-t border-cyber-green/10 text-right">
                    <button 
                        onClick={() => setIsMissionModalOpen(false)}
                        className="text-[10px] font-mono text-cyber-green/40 hover:text-cyber-red transition-colors uppercase"
                    >
                        Abort Operation
                    </button>
                </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TargetsPage;
