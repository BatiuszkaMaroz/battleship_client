import { io } from 'socket.io-client';

import { enqueueSnackbar } from 'notistack';
import {
  Notification,
  useNotificationsStore,
} from 'stores/useNotificationsStore';
import { RoomStatus, useRoomStore } from 'stores/useRoomStore';
import { UserStatus, useUserStore } from 'stores/useUserStore';
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

/* ========================= USER ========================= */

type UserUpdatePayload = {
  userStatus?: UserStatus;

  userId?: string;
  username?: string;
};

socket.on('user-update', (payload: UserUpdatePayload) => {
  console.log('[user-update] Received payload: ', payload);

  const store = useUserStore.getState();

  if (payload.userId) {
    store.setUserId(payload.userId);
    saveUserData(payload.userId);
  }
  if (payload.username) {
    store.setUsername(payload.username);
  }
  if (payload.userStatus) {
    store.setUserStatus(payload.userStatus);

    if (payload.userStatus === UserStatus.IDLE) {
      const roomStore = useRoomStore.getState();
      const gameStore = useRoomStore.getState();

      roomStore.resetState();
      gameStore.resetState();
    }
  }
});

/* ========================= ROOM ========================= */

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

/* ========================= NOTIFICATION ========================= */

type NotificationPayload = Notification;

socket.on('notification', (payload: NotificationPayload) => {
  console.log('[notification] Received notification: ', payload);

  const store = useNotificationsStore.getState();
  store.addNotification(payload);

  enqueueSnackbar(payload.content, { variant: payload.severity });
});
