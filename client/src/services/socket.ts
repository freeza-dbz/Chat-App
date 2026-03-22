import io, { Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

class SocketService {
  private socket: Socket | null = null;

  connect() {
    if (this.socket?.connected) return this.socket;

    this.socket = io(SOCKET_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      transports: ['websocket', 'polling'],
    });

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket?.id);
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  getSocket() {
    return this.socket;
  }

  // Message events
  sendMessage(conversationId: string, message: any) {
    this.socket?.emit('sendMessage', { conversationId, ...message });
  }

  onMessage(callback: (data: any) => void) {
    this.socket?.on('getMessage', callback);
  }

  offMessage(callback: (data: any) => void) {
    this.socket?.off('getMessage', callback);
  }

  // Online status events
  onOnlineUsers(callback: (users: string[]) => void) {
    this.socket?.on('onlineUsers', callback);
  }

  offOnlineUsers(callback: (users: string[]) => void) {
    this.socket?.off('onlineUsers', callback);
  }

  // User status events
  onUserStatusChanged(callback: (data: any) => void) {
    this.socket?.on('userStatusChanged', callback);
  }

  offUserStatusChanged(callback: (data: any) => void) {
    this.socket?.off('userStatusChanged', callback);
  }

  // Typing indicators
  sendTyping(conversationId: string, userId: string) {
    this.socket?.emit('typing', { conversationId, userId });
  }

  onTyping(callback: (data: any) => void) {
    this.socket?.on('typing', callback);
  }

  offTyping(callback: (data: any) => void) {
    this.socket?.off('typing', callback);
  }
}

export default new SocketService();
