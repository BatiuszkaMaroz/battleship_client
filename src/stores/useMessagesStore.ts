import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type Message = {
  title?: string;
  content: string;
  severity: 'info' | 'error';
};

interface MessagesState {
  readonly messages: Message[];
  addMessage: (message: Message) => void;
}

export const useMessagesStore = create<MessagesState>()(
  devtools((set) => ({
    messages: [],

    addMessage: (message) =>
      set((state) => ({
        messages: [message, ...state.messages],
      })),
  })),
);
