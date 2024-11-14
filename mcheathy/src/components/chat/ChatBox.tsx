"use client";
import { useChatContext } from "@/context/ChatContext";
import useFetchData from "@/hooks/useFetchData";
import { Chat, Doctor, Message, User } from "@/lib/interface";
import { useCurrentUserStore, useTokenStorage } from "@/store/store";
import React from "react";
import { FormControl, FormField, FormItem, Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputEmoji from "react-input-emoji";
import { useTheme } from "next-themes";
import { toast } from "react-toastify";
import { ScrollArea } from "../ui/scroll-area";
function ChatBox({ type }: { type: string }) {
    const { recipientId } = useChatContext();
    const { theme } = useTheme();
    const currentUserID = useCurrentUserStore((state) => state.id);
    const accessToken = useTokenStorage((state) => state.accessToken);
    type typeFetchRecipienter = Doctor | User;

    const { data: recipienter } = useFetchData<typeFetchRecipienter>(
        type === "User"
            ? `${process.env.NEXT_PUBLIC_API_URL}/users/getUserByQueryID?userId=${recipientId}`
            : `${process.env.NEXT_PUBLIC_API_URL}/doctors/getDoctorByID?doctorId=${recipientId}`,
        "Fetch data failed",
        accessToken || " "
    );
    const { data: chat } = useFetchData<Chat>(
        `${process.env.NEXT_PUBLIC_API_URL}/chats/find/${currentUserID}/${recipientId}`,
        "Fetch chat failed",
        accessToken || ""
    );
    const { data: messages } = useFetchData<Message[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/messages/${chat?._id}`,
        "Fetch messages failed",
        accessToken || ""
    );

    const formSchema = z.object({
        text: z.string().min(1, {
            message: "Text must be at least 1 characters.",
        }),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            text: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (values.text === "") return;
        console.log(values);
        try {
            const response = fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/messages`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        chatId: chat?._id,
                        text: values.text,
                        senderId: currentUserID,
                    }),
                }
            );
            if (!response) toast.error("Create message failed");
            form.reset();
        } catch (error) {
            toast.error(String(error));
        }
    }
    return (
        <div className="flex flex-col flex-1 w-full p-8 border-t-2 border-gray-500">
            <div className="flex-1">
                {messages && messages.length > 0 && (
                    <div>
                        <div className="text-center">
                            Chat with {recipienter?.name}
                        </div>
                        <ScrollArea className="p-4 h-[250px]">
                            <div className="flex flex-col gap-4">
                                {messages.map((item, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            backgroundColor:
                                                item.senderId === currentUserID
                                                    ? "#00bcd4"
                                                    : "#3f3f3f",
                                            color: "white",
                                            padding: "10px",
                                            borderRadius: "10px",
                                            maxWidth: "60%",
                                            marginLeft:
                                                item.senderId === currentUserID
                                                    ? "auto"
                                                    : "0",
                                        }}
                                    >
                                        {item.text}
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                )}

                {!recipientId && (
                    <div className="w-full mx-auto text-center">
                        Select someone
                    </div>
                )}
                {recipientId && messages?.length == 0 && (
                    <div className="text-center">
                        Chat with {recipienter?.name}
                    </div>
                )}
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex w-full gap-4"
                >
                    <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl className="">
                                    <InputEmoji
                                        shouldReturn={false}
                                        shouldConvertEmojiToImage={false}
                                        placeholder="Type your message"
                                        {...field}
                                        borderRadius={4}
                                        borderColor="gray "
                                        background="transparent"
                                        color={
                                            theme === "dark" ? "white" : "black"
                                        }
                                    ></InputEmoji>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <button type="submit" className="flex-shrink">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                            />
                        </svg>
                    </button>
                </form>
            </Form>
        </div>
    );
}

export default ChatBox;