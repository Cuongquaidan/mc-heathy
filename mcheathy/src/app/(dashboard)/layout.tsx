import SlideBar from "@/components/SlideBar";
import { ProtectAdminRoute } from "@/middleware/auth";
import React from "react";

function DashBoardLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectAdminRoute>
            <div className="grid grid-cols-[300px,minmax(0,1fr)]">
                <SlideBar></SlideBar>
                <main>{children}</main>
            </div>
        </ProtectAdminRoute>
    );
}

export default DashBoardLayout;
