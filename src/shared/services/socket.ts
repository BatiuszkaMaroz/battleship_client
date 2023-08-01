import { io } from 'socket.io-client';

export const socket = io(process.env.SOCKET_ENDPOINT, {
  query: {
    userId: '123',
  },
});

socket.on('connect', () => {
  console.log(`User connected (socket.id=${socket.id}).`);
});

socket.on('disconnect', () => {
  console.log(`User disconnected (socket.id=${socket.id}).`);
});

type Message = {
  message: string;
  [key: string]: unknown;
};

socket.on('notification-channel', (notification: Message) => {
  console.log('Notification received:', notification);
});

socket.on('error-channel', (error: Message) => {
  console.log('Error received:', error);
});
