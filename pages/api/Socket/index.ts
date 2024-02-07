import { Server as IOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { NextApiRequest,NextApiResponse } from 'next';
import { Socket as NetSocket } from 'net';

interface SocketServer extends HTTPServer {
    io?: IOServer;
  }
  
  interface SocketWithIO extends NetSocket {
    server: SocketServer;
  }
  
  interface NextApiResponseWithSocket extends NextApiResponse {
    socket: SocketWithIO;
  }

  export default function SocketHandler(req: NextApiRequest, res: NextApiResponseWithSocket) {

    if (!res.socket.server.io) {
      console.log('Initializing Socket.IO server...');
  
      const httpServer: SocketServer = res.socket.server as any;
      const io = new IOServer(httpServer, {
        path: '/api/socket',
      });
  
      httpServer.io = io;
  
      io.on('connection', (socket) => {
        console.log('Socket.IO client connected');
  
        socket.on('joinRoom', (gameCode: string) => {
          console.log(`A user joined room: ${gameCode}`);
          socket.join(gameCode);
  
          socket.to(gameCode).emit('playerJoined', { gameCode });
  
          socket.on('startGame', () => {
            console.log(`Game starting in room: ${gameCode}`);
            io.in(gameCode).emit('gameStarted');
          });
        });
      });
  
      console.log('Socket.IO server initialized');
    } else {
      console.log('Socket.IO server already running');
    }
  
    res.end();
  }