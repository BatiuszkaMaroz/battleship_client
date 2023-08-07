import { Message, useMessagesStore } from 'shared/stores/useMessagesStore';
import { useUserStore } from 'shared/stores/useUserStore';
import { io } from 'socket.io-client';

export const socket = io(process.env.SOCKET_ENDPOINT, {
  query: {
    userId: sessionStorage.getItem('userId'),
  },
});

socket.on('connect', () => {
  console.log(`User connected (socket.id=${socket.id}).`);
});

socket.on('disconnect', () => {
  console.log(`User disconnected (socket.id=${socket.id}).`);
});

socket.on('user-data', (payload) => {
  const store = useUserStore.getState();
  store.setUserId(payload.userId);
  store.setUsername(payload.username);

  sessionStorage.setItem('userId', payload.userId);
});

socket.on('matchmaking-start', (payload) => {
  console.log(payload);
});

socket.on('room-update', (payload) => {
  console.log(payload);
});

socket.on('message-channel', (message: Message) => {
  console.log('Received message: ', message);

  const store = useMessagesStore.getState();
  store.addMessage(message);
});
