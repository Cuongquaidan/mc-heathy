"use client";
import useFetchData from "@/hooks/useFetchData";
import { useTokenStorage } from "@/store/store";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Doctor, User } from "@/lib/interface";
import { useChatContext } from "@/context/ChatContext";

function ChatAvatar({ id, type }: { id: string; type: string }) {
    type typeFetchAvatar = Doctor | User;

    const accessToken = useTokenStorage((item) => item.accessToken);
    const { setRecipientId } = useChatContext();
    const { data, error } = useFetchData<typeFetchAvatar>(
        type === "User"
            ? `${process.env.NEXT_PUBLIC_API_URL}/users/getUserByID?userID=${id}`
            : `${process.env.NEXT_PUBLIC_API_URL}/doctors/getDoctorByID?doctorId=${id}`,
        "Fetch data failed",
        accessToken || " "
    );
    if (error) return <div className="hidden">{error}</div>;
    return (
        <div
            className="relative w-[60px] h-[60px] mr-8 cursor-pointer"
            onClick={() => setRecipientId(id)}
        >
            <Avatar
                style={{
                    width: "60px",
                    height: "60px",
                }}
            >
                <AvatarImage src={data?.avatar}></AvatarImage>
                <AvatarFallback>{data?.name}</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 z-40 w-4 h-4 bg-green-500 rounded-full"></div>
        </div>
    );
}

export default ChatAvatar;
