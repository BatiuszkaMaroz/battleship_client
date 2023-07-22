import { io } from 'socket.io-client';

export const socket = io(process.env.SOCKET_ENDPOINT);

socket.on('connect', () => {
  console.log(`Socket connected with id: ${socket.id}.`);
});

socket.on('disconnect', () => {
  console.log('Socket disconnected.');
});
