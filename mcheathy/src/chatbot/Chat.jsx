"use client";
import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "@/chatbot/config";
import MessageParser from "@/chatbot/MessageParser";
import ActionProvider from "@/chatbot/ActionProvider";

function ChatBot() {
    const [isShow, setIsShow] = useState(false);

    return (
        <div
            className="fixed z-50 cursor-pointer"
            style={{ bottom: "20px", right: "20px" }}
        >
            {isShow ? (
                <div className="w-[500px] ">
                    <div
                        onClick={() => setIsShow((prev) => !prev)}
                        style={{
                            backgroundColor: "red",
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}
                    >
                        X
                    </div>
                    <Chatbot
                        config={config}
                        messageParser={MessageParser}
                        actionProvider={ActionProvider}
                    />
                </div>
            ) : (
                <div
                    className="flex items-center justify-center w-20 h-20 p-5 text-3xl text-white rounded-full"
                    style={{ backgroundColor: "blue" }}
                    onClick={() => setIsShow((prev) => !prev)}
                >
                    ?
                </div>
            )}
        </div>
    );
}

export default ChatBot;
