/* eslint-disable @typescript-eslint/no-unused-vars */
// ChatContext.js
"use client";
import { Chat, Message } from "@/lib/interface";
import React, { createContext, useContext, useEffect, useState } from "react";

import useFetchData from "@/hooks/useFetchData";
import { useCurrentUserStore, useTokenStorage } from "@/store/store";
import { io, Socket } from "socket.io-client";

type onlineUser = {
    userId: string;
    socketId: string;
};

const ChatContext = createContext<{
    showChat: boolean;
    setShowChat: (value: boolean) => void;
    currentChats: Chat[];
    setCurrentChats: (value: Chat[]) => void;
    currentChat: Chat;
    setCurrentChat: (value: Chat) => void;
    recipientId: string;
    setRecipientId: (value: string) => void;
    onlineUsers: onlineUser[];
    message: Message;
    setMessage: (value: Message) => void;
    setMessages: (value: Message[]) => void;
    messages: Message[];
}>({
    showChat: false,
    setShowChat: () => {}, // No-op function for default value
    currentChats: [], // Default is an empty array
    setCurrentChats: () => {}, // No-op function for default value
    currentChat: { _id: "", members: [] }, // Default is an empty array
    setCurrentChat: () => {}, // No-op function for default value
    recipientId: "",
    setRecipientId: () => {},
    onlineUsers: [],
    message: {
        _id: "",
        chatId: "",
        senderId: "",
        text: "",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    setMessage: () => {},
    setMessages: () => {},
    messages: [],
});

// Provider component to wrap around consumers
export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
    const [showChat, setShowChat] = useState(false);
    const [currentChats, setCurrentChats] = useState<Chat[]>([]);
    const [currentChat, setCurrentChat] = useState<Chat>({
        _id: "",
        members: [],
    });
    const [recipientId, setRecipientId] = useState<string>("");
    const [onlineUsers, setOnlineUsers] = useState<onlineUser[]>([]);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const accessToken = useTokenStorage((state) => state.accessToken);
    const currentUserID = useCurrentUserStore((state) => state.id);
    const [message, setMessage] = useState<Message>({
        _id: "",
        chatId: "",
        senderId: "",
        text: "",
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    const { data: chats } = useFetchData<Chat[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/chats/${currentUserID}`,
        "Fetch data failed",
        accessToken || ""
    );
    const { data: chat } = useFetchData<Chat>(
        `${process.env.NEXT_PUBLIC_API_URL}/chats/find/${currentUserID}/${recipientId}`,
        "Fetch chat failed",
        accessToken || ""
    );
    const { data: messagesReceive } = useFetchData<Message[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/messages/${chat?._id}`,
        "Fetch messages failed",
        accessToken || ""
    );
    useEffect(() => {
        if (messagesReceive) {
            setMessages(messagesReceive);
        }
    }, [messagesReceive]);
    console.log(onlineUsers);
    useEffect(() => {
        if (chats) {
            setCurrentChats(chats);
        }
    }, [chats]);
    useEffect(() => {
        if (chat) {
            setCurrentChat(chat);
        }
    }, [chat]);
    useEffect(() => {
        const newSocket = io("http://localhost:8000");
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [currentUserID]);

    // Add online user
    useEffect(() => {
        if (socket === null) return;
        socket.emit("addNewUser", currentUserID);
        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res);
        });
        return () => {
            socket.off("getOnlineUsers");
        };
    }, [socket, currentUserID]);

    // send message
    useEffect(() => {
        if (socket === null) return;
        socket.emit("sendMessage", { ...message, recipientId });

        return () => {
            socket.off("getOnlineUsers");
        };
    }, [message, recipientId]);
    // receive message
    useEffect(() => {
        if (socket === null) return;
        socket.on("getMessage", (res) => {
            setMessages((prev) => [...prev, res]);
        });
        return () => {
            socket.off("getMessage");
        };
    }, [socket, recipientId, message]);
    return (
        <ChatContext.Provider
            value={{
                showChat,
                setShowChat,
                currentChats,
                setCurrentChats,
                currentChat,
                setCurrentChat,
                recipientId,
                setRecipientId,
                onlineUsers,
                message,
                setMessage,
                messages,
                setMessages,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

// Hook to use the context in child components
export const useChatContext = () => useContext(ChatContext);
