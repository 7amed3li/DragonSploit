import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';

class LoggerService {
  private io: SocketIOServer | null = null;

  init(server: HTTPServer) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
        methods: ['GET', 'POST'],
        credentials: true
      }
    });

    this.io.on('connection', (socket) => {
      console.log(`[WebSocket] Operator connected: ${socket.id}`);
      
      socket.on('join_terminal', () => {
        socket.join('terminal_logs');
        console.log(`[WebSocket] Operator ${socket.id} joined terminal chamber.`);
        this.log('OPERATOR_LINK_ESTABLISHED :: ENCRYPTED_TUNNEL_ACTIVE', 'success');
      });

      socket.on('execute_command', (data: { command: string }) => {
        this.log(`COMMAND_INPUT :: ${data.command}`, 'command');
        this.processRemoteCommand(data.command);
      });

      socket.on('disconnect', () => {
        console.log(`[WebSocket] Operator disconnected: ${socket.id}`);
      });
    });
  }

  private processRemoteCommand(cmd: string) {
    const command = cmd.toLowerCase().trim();
    
    if (command === 'status') {
      this.log('NODE_STATUS :: ALL_SYSTEMS_OPERATIONAL', 'success');
    } else if (command === 'list agents') {
      this.log('ACTIVE_AGENTS :: [AGENT_01, AGENT_02, EDGE_NODE_09]', 'info');
    } else if (command === 'whoami') {
       this.log('IDENTITY :: DRAGONSPLOIT_OPERATOR_LEVEL_1', 'info');
    } else {
      this.log(`REMOTE_EXEC_ERROR :: Unknown or unauthorized command: ${command}`, 'error');
    }
  }

  /**
   * Broadcasts a log message to all connected clients in the terminal room.
   */
  log(content: string, type: 'info' | 'success' | 'warning' | 'error' | 'command' = 'info') {
    if (this.io) {
      this.io.to('terminal_logs').emit('terminal_log', {
        id: Math.random().toString(36).substring(7),
        timestamp: new Date().toLocaleTimeString(),
        type,
        content
      });
    }
    // Also log to console for backend visibility
    console.log(`[TerminalLog] [${type.toUpperCase()}] ${content}`);
  }
}

export const logger = new LoggerService();
