import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type Notification = {
  content: string;
  severity: 'info' | 'error';
};

interface NotificationsState {
  readonly notifications: Notification[];
  addNotification: (notification: Notification) => void;
}

export const useNotificationsStore = create<NotificationsState>()(
  devtools((set) => ({
    notifications: [],

    addNotification: (notification) =>
      set((state) => ({
        notifications: [notification, ...state.notifications],
      })),
  })),
);
