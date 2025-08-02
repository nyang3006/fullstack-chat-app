import type { User } from '../types/user.d.ts';
import type { Message } from './message.ts';

export type MessageData = {
    text: string,
    image: string,
}

export type ChatState = {
    messages: Message[],
    users: User[],
    selectedUser: User | null,
    isUserLoading: boolean,
    isMessagesLoading: boolean,
    getUsers: () => Promise<void>,
    getMessages: (userId: string) => Promise<void>,
    sendMessage: (messageData: MessageData) => Promise<void>,
    subscribeToMessages: () => void;
    unsubscribeFromMessages: () => void;
    setSelectedUser: (selectedUser: User | null) => Promise<void>,
}