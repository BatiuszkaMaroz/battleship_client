import { io } from 'socket.io-client';

import { enqueueSnackbar } from 'notistack';
import {
  Notification,
  useNotificationsStore,
} from 'stores/useNotificationsStore';
import { RoomStatus, useRoomStore } from 'stores/useRoomStore';
import { useUserStore } from 'stores/useUserStore';
import { loadUserData, saveUserData } from './storageService';

export const socket = io(process.env.SOCKET_ENDPOINT, {
  query: {
    userId: loadUserData(),
  },
});

socket.on('connect', () => {
  console.log(`[connect] Socket connected with id ${socket.id}.`);
});

socket.on('disconnect', () => {
  console.log(`[disconnect] Socket disconnected.`);
});

socket.on('user-update', (payload) => {
  console.log('[user-update] Received payload: ', payload);

  const store = useUserStore.getState();
  store.setUserId(payload.userId);
  store.setUsername(payload.username);

  saveUserData(payload.userId);
});

type RoomUpdatePayload = {
  roomStatus?: RoomStatus;
  rivalData?: {
    username: string;
  };
};

socket.on('room-update', (payload: RoomUpdatePayload) => {
  console.log('[room-update] Received payload: ', payload);

  const store = useRoomStore.getState();

  if (payload.roomStatus) {
    store.setRoomStatus(payload.roomStatus);
  }
  if (payload.rivalData) {
    store.setRivalData(payload.rivalData);
  }
});

socket.on('room-chat', (payload) => {
  console.log('[room-chat] Received payload: ', payload);
});

socket.on('notification', (notification: Notification) => {
  console.log('[notification] Received notification: ', notification);

  const store = useNotificationsStore.getState();
  store.addNotification(notification);

  enqueueSnackbar(notification.content, { variant: notification.severity });
});
