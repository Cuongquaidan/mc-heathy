import SlideBar from "@/components/SlideBar";
import { AuthorizeUserRoute, ProtectAdminRoute } from "@/middleware/auth";
import React from "react";
import { ThemeProvider } from "@/components/theme-provider";

function DashBoardLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthorizeUserRoute>
            <ProtectAdminRoute>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="grid grid-cols-[300px,minmax(0,1fr)]">
                        <SlideBar></SlideBar>
                        <main>{children}</main>
                    </div>
                </ThemeProvider>
            </ProtectAdminRoute>
        </AuthorizeUserRoute>
    );
}

export default DashBoardLayout;
