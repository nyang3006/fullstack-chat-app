import toast from 'react-hot-toast';
import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import type { ChatState } from '../types/chat';
import type { User } from '../types/user';
import { useAuthStore } from './useAuthStore';

export const useChatStore = create<ChatState>((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUserLoading: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data });
        } catch (error: any) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUserLoading: false });
        }
    },
    getMessages: async (userId: string) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data })
        } catch (error: any) {
            toast.error(error.response.data.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },
    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser?._id}`, messageData);
            set({ messages: [...messages, res.data] });
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    },
    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;
        if (socket) {
            socket.on("newMessage", (newMessage) => {

                // if message is not sent from the selected user
                if (newMessage.senderId !== selectedUser._id) return;
                set({ messages: [...get().messages, newMessage] });
            });
        }
    },
    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        if (socket) {
            socket.off("newMessage");
        }
    },
    setSelectedUser: async (selectedUser: User | null) => set({ selectedUser }),
}))