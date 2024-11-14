"use client";
import React from "react";
import { useChatContext } from "@/context/ChatContext";
import { useCurrentUserStore } from "@/store/store";
import ChatAvatar from "./ChatAvatar";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import ChatBox from "./ChatBox";

function ChatListDoctor() {
    const { showChat, setShowChat, currentChats } = useChatContext();
    console.log(currentChats);
    const currentId = useCurrentUserStore((state) => state.id);
    console.log(currentChats[0]?.members[0] === currentId);
    return (
        <div className="fixed -translate-y-1/2 select-none top-1/2 left-10">
            {showChat ? (
                <div className="flex flex-col bg-white text-primaryGray dark:bg-darkBackground dark:text-darkTextPrimary  rounded-xl w-[400px] h-[600px] border border-gray-500">
                    <div className="flex justify-end">
                        <div
                            className="p-4 font-bold text-white bg-red-500 cursor-pointer rounded-tr-xl rounded-bl-xl"
                            onClick={() => setShowChat(false)}
                        >
                            X
                        </div>
                    </div>
                    <ScrollArea className="p-8">
                        <div className="flex w-full ">
                            {currentChats &&
                                currentChats.length > 0 &&
                                currentChats.map((item, index) => (
                                    <ChatAvatar
                                        id={
                                            item.members[0] === currentId
                                                ? item.members[1]
                                                : item.members[0]
                                        }
                                        type="User"
                                        key={index}
                                    ></ChatAvatar>
                                ))}
                            {(currentChats?.length === 0 || !currentChats) && (
                                <div className="text-center">
                                    You dont have any chats
                                </div>
                            )}
                        </div>
                        <ScrollBar className="mt-5" orientation="horizontal" />
                    </ScrollArea>
                    <ChatBox type="User"></ChatBox>
                </div>
            ) : (
                <div
                    className="p-5 bg-green-500 rounded-full cursor-pointer"
                    onClick={() => setShowChat(true)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-10 h-10"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                        />
                    </svg>
                </div>
            )}
        </div>
    );
}

export default ChatListDoctor;
