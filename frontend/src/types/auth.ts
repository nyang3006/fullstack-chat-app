import type { Socket } from "socket.io-client"
import type { User } from "./user"

export type SignUpFormData = {
    fullName: string,
    email: string,
    password: string
}
export type LoginFormData = {
    email: string,
    password: string
}

export type UpdateProfileData = {
    profilePic: string
}
export type AuthState = {
    authUser: User | null;
    isSigningUp: boolean;
    isLoggingIn: boolean;
    isUpdatingProfile: boolean;
    isCheckingAuth: boolean;
    onlineUsers: string[],
    socket: Socket | null,
    checkAuth: () => Promise<void>;
    signUp: (data: SignUpFormData) => Promise<void>;
    logout: () => Promise<void>;
    login: (data: LoginFormData) => Promise<void>;
    updateProfile: (data: UpdateProfileData) => Promise<void>;
    connectSocket: () => void;
    disconnectSocket: () => void;
}

