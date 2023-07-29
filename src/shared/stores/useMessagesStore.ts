import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type Message = {
  title?: string;
  content: string;
};

interface MessagesState {
  readonly notifications: Message[];
  readonly errors: Message[];
}

export const useMessagesStore = create<MessagesState>()(
  devtools((set) => ({
    notifications: [],
    errors: [],

    addNotification: (notificationMessage: Message) =>
      set((state) => ({
        notifications: [...state.notifications, notificationMessage],
      })),

    addError: (errorMessage: Message) =>
      set((state) => ({ errors: [...state.errors, errorMessage] })),
  })),
);
