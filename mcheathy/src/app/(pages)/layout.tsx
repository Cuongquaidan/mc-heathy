import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";

import { AuthorizeUserRoute } from "@/middleware/auth";
import React, { ReactNode } from "react";
import ChatBot from "@/chatbot/Chat";
import { ToastContainer } from "react-toastify";
function PageLayout({ children }: { children: ReactNode }) {
    return (
        <AuthorizeUserRoute>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <ToastContainer></ToastContainer>
                <Header></Header>
                {children}
                <Footer></Footer>
                <ChatBot></ChatBot>
            </ThemeProvider>
        </AuthorizeUserRoute>
    );
}

export default PageLayout;
