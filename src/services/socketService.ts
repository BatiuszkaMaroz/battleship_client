import { io } from 'socket.io-client';
import { Message, useMessagesStore } from 'stores/useMessagesStore';
import { useUserStore } from 'stores/useUserStore';
import { loadUserData, saveUserData } from './storageService';

export const socket = io(process.env.SOCKET_ENDPOINT, {
  query: {
    userId: loadUserData(),
  },
});

socket.on('connect', () => {
  console.log(`Socket connected with id ${socket.id}.`);
});

socket.on('disconnect', () => {
  console.log(`Socket disconnected.`);
});

socket.on('user-update', (payload) => {
  const store = useUserStore.getState();
  store.setUserId(payload.userId);
  store.setUsername(payload.username);

  saveUserData(payload.userId);
});

socket.on('room-update', (payload) => {
  console.log(payload);
});

socket.on('room-chat', (payload) => {
  console.log(payload);
});

socket.on('message', (message: Message) => {
  console.log('Received message: ', message);

  const store = useMessagesStore.getState();
  store.addMessage(message);
});
