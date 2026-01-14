import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal as TerminalIcon, 
  Cpu, 
  Zap, 
  Wifi, 
  Shield, 
  Activity, 
  ChevronRight,
  Database,
  Lock
} from 'lucide-react';
import { io } from 'socket.io-client';
import { useTranslation } from 'react-i18next';

interface LogLine {
  id: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'command';
  content: string;
}

const TerminalPage: React.FC = () => {
  const { t } = useTranslation();
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [input, setInput] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [systemStats, setSystemStats] = useState({
    cpu: 18,
    ram: 22,
    net: 1.2
  });

  // Real-time WebSocket logs
  const socketRef = useRef<any>(null);

  useEffect(() => {
    const socket = io('http://localhost:3001', {
      withCredentials: true
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Connected to Command Center');
      socket.emit('join_terminal');
    });

    socket.on('terminal_log', (log: LogLine) => {
      setLogs(prev => [...prev.slice(-99), log]); // Keep last 100 logs for real data
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Update system stats simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStats({
        cpu: Math.floor(Math.random() * 15) + 10,
        ram: Math.floor(Math.random() * 5) + 20,
        net: Number((Math.random() * 5).toFixed(1))
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.toLowerCase().trim();

    // Clear is a local frontend command
    if (cmd === 'clear') {
      setLogs([]);
      setInput('');
      return;
    }

    // Send all other commands to backend via WebSocket
    if (socketRef.current) {
      socketRef.current.emit('execute_command', { command: input });
    }

    setInput('');
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-6">
      {/* Top Header Information */}
      <div className="flex justify-between items-center bg-black/40 border border-cyber-green/10 p-4 rounded-sm">
        <div className="flex gap-8">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-cyber-green/5 rounded-sm border border-cyber-green/20 text-cyber-green">
                <Shield size={16} />
             </div>
             <div>
                <p className="text-[8px] font-mono text-cyber-green/40 uppercase">Kernel Security</p>
                <p className="text-xs font-mono font-bold text-white uppercase tracking-widest">DRAGON_K2</p>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="p-2 bg-blue-400/5 rounded-sm border border-blue-400/20 text-blue-400">
                <Database size={16} />
             </div>
             <div>
                <p className="text-[8px] font-mono text-blue-400/40 uppercase">Storage Cluster</p>
                <p className="text-xs font-mono font-bold text-white uppercase tracking-widest">POSTGRES_MASTER</p>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="p-2 bg-purple-400/5 rounded-sm border border-purple-400/20 text-purple-400">
                <Wifi size={16} />
             </div>
             <div>
                <p className="text-[8px] font-mono text-purple-400/40 uppercase">Remote Tunnel</p>
                <p className="text-xs font-mono font-bold text-white uppercase tracking-widest">STX-VPN-01</p>
             </div>
          </div>
        </div>

        <div className="flex gap-4">
           {/* Telemetry Widgets */}
           <div className="flex flex-col items-end">
              <span className="text-[8px] font-mono text-cyber-green/40 uppercase">Agent Telemetry</span>
              <div className="flex gap-1 mt-1">
                 {[1,0,1,1,1,0,1,1].map((v, i) => (
                   <div key={i} className={`w-1 h-3 rounded-full ${v ? 'bg-cyber-green animate-pulse' : 'bg-white/10'}`} />
                 ))}
              </div>
           </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
        {/* Main Terminal Shell */}
        <div className="lg:col-span-3 bg-black border border-cyber-green/20 rounded-sm flex flex-col relative overflow-hidden group shadow-[0_0_30px_rgba(0,255,65,0.05)]">
           {/* Scan Line Effect */}
           <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
           
           <div className="p-4 border-b border-cyber-green/10 flex justify-between items-center bg-cyber-green/5">
              <div className="flex items-center gap-2">
                 <TerminalIcon size={14} className="text-cyber-green" />
                 <span className="text-[10px] font-mono font-bold text-cyber-green uppercase tracking-widest">root@dragonsploit:~# /usr/bin/bash</span>
              </div>
              <div className="flex gap-1">
                 <div className="w-2 h-2 rounded-full bg-cyber-red/40" />
                 <div className="w-2 h-2 rounded-full bg-yellow-400/40" />
                 <div className="w-2 h-2 rounded-full bg-cyber-green/40" />
              </div>
           </div>

           <div 
             ref={terminalRef}
             className="flex-1 p-6 overflow-y-auto font-mono text-xs space-y-2 custom-scrollbar selection:bg-cyber-green selection:text-black"
           >
              <AnimatePresence mode="popLayout">
                {logs.map((log) => (
                  <motion.div 
                    key={log.id}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.1 }}
                    className={`flex gap-3 ${
                      log.type === 'error' ? 'text-cyber-red' : 
                      log.type === 'warning' ? 'text-yellow-400' : 
                      log.type === 'success' ? 'text-cyber-green font-bold' : 
                      log.type === 'command' ? 'text-white font-bold opacity-100' :
                      'text-cyber-green/60'
                    }`}
                  >
                    <span className="opacity-30 whitespace-nowrap">[{log.timestamp}]</span>
                    <span className="break-all whitespace-pre-wrap">{log.content}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
           </div>

           <form 
             onSubmit={handleCommand}
             className="p-4 bg-black border-t border-cyber-green/10 flex items-center gap-2"
           >
              <ChevronRight size={16} className="text-cyber-green animate-pulse" />
              <input 
                ref={inputRef}
                autoFocus
                type="text"
                placeholder="Type 'help' for commands..."
                className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs placeholder:text-cyber-green/20"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
           </form>
        </div>

        {/* Sidebar Health & Resources */}
        <div className="space-y-6">
           {/* Telemetry Card */}
           <div className="bg-black/40 border border-cyber-green/10 p-6 rounded-sm">
              <h3 className="text-[10px] font-mono font-bold text-cyber-green uppercase mb-6 flex items-center gap-2">
                 <Activity size={12} /> {t('terminal.telemetry')}
              </h3>

              <div className="space-y-6">
                 <div>
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-[9px] font-mono text-cyber-green/40 uppercase flex items-center gap-1"><Cpu size={10} /> CPU Load</span>
                       <span className="text-xs font-bold text-white tracking-widest">{systemStats.cpu}%</span>
                    </div>
                    <div className="h-1 bg-cyber-green/5 rounded-full overflow-hidden">
                       <motion.div animate={{ width: `${systemStats.cpu}%` }} className="h-full bg-cyber-green shadow-[0_0_10px_#00ff41]" />
                    </div>
                 </div>

                 <div>
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-[9px] font-mono text-blue-400/40 uppercase flex items-center gap-1"><Zap size={10} /> RAM Usage</span>
                       <span className="text-xs font-bold text-white tracking-widest">{systemStats.ram}%</span>
                    </div>
                    <div className="h-1 bg-blue-400/5 rounded-full overflow-hidden">
                       <motion.div animate={{ width: `${systemStats.ram}%` }} className="h-full bg-blue-400 shadow-[0_0_10px_#60a5fa]" />
                    </div>
                 </div>

                 <div>
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-[9px] font-mono text-purple-400/40 uppercase flex items-center gap-1"><Wifi size={10} /> Net Flow</span>
                       <span className="text-xs font-bold text-white tracking-widest">{systemStats.net} MB/s</span>
                    </div>
                    <div className="h-1 bg-purple-400/5 rounded-full overflow-hidden">
                       <motion.div animate={{ width: `${(systemStats.net / 5) * 100}%` }} className="h-full bg-purple-400 shadow-[0_0_10px_#a855f7]" />
                    </div>
                 </div>
              </div>
           </div>

           {/* Quick Access Tools */}
           <div className="bg-black/40 border border-cyber-green/10 p-6 rounded-sm">
              <h3 className="text-[10px] font-mono font-bold text-cyber-green uppercase mb-4 flex items-center gap-2">
                 <Lock size={12} /> {t('terminal.tools')}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                 {['IP_LOOKUP', 'HASH_GEN', 'PORT_SCAN', 'AGENT_SH'].map(tool => (
                   <button key={tool} className="py-2 px-1 border border-cyber-green/10 text-[8px] font-mono text-cyber-green/60 hover:border-cyber-green hover:bg-cyber-green/10 hover:text-cyber-green transition-all uppercase">
                      {tool}
                   </button>
                 ))}
              </div>
           </div>

           <div className="p-4 bg-cyber-red/5 border border-cyber-red/20 rounded-sm flex items-start gap-4">
              <Shield size={24} className="text-cyber-red animate-pulse" />
              <div>
                 <p className="text-[10px] font-mono font-bold text-cyber-red uppercase">Intrusion Alert</p>
                 <p className="text-[9px] font-mono text-cyber-red/40 uppercase mt-1 leading-tight">Unauthorized probing detected on Edge-Agent-09</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalPage;
