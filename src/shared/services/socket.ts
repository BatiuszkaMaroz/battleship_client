import { Message, useMessagesStore } from 'shared/stores/useMessagesStore';
import { io } from 'socket.io-client';

export const socket = io(process.env.SOCKET_ENDPOINT, {
  // query: {
  // userId: '123',
  // },
});

socket.on('connect', () => {
  console.log(`User connected (socket.id=${socket.id}).`);
});

socket.on('disconnect', () => {
  console.log(`User disconnected (socket.id=${socket.id}).`);
});

socket.on('message-channel', (message: Message) => {
  console.log('Received message: ', message);

  const store = useMessagesStore.getState();
  store.addMessage(message);
});
