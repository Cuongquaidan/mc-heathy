/* eslint-disable @typescript-eslint/no-unused-vars */
// ChatContext.js
"use client";
import { Chat } from "@/lib/interface";
import React, { createContext, useContext, useEffect, useState } from "react";

import useFetchData from "@/hooks/useFetchData";
import { useCurrentUserStore, useTokenStorage } from "@/store/store";
const ChatContext = createContext<{
    showChat: boolean;
    setShowChat: (value: boolean) => void;
    currentChats: Chat[];
    setCurrentChats: (value: Chat[]) => void;
}>({
    showChat: false,
    setShowChat: () => {}, // No-op function for default value
    currentChats: [], // Default is an empty array
    setCurrentChats: () => {}, // No-op function for default value
});

// Provider component to wrap around consumers
export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
    const [showChat, setShowChat] = useState(false);
    const [currentChats, setCurrentChats] = useState<Chat[]>([]);
    const accessToken = useTokenStorage((state) => state.accessToken);
    const currentUserID = useCurrentUserStore((state) => state.id);
    const { data: chats } = useFetchData<Chat[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/chats/${currentUserID}`,
        "Fetch data failed",
        accessToken || ""
    );
    useEffect(() => {
        if (chats) {
            setCurrentChats(chats);
        }
    }, [chats]);
    return (
        <ChatContext.Provider
            value={{ showChat, setShowChat, currentChats, setCurrentChats }}
        >
            {children}
        </ChatContext.Provider>
    );
};

// Hook to use the context in child components
export const useChatContext = () => useContext(ChatContext);
