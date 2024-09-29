import SlideBar from "@/components/SlideBar";
import React from "react";

function DashBoardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-[300px,minmax(0,1fr)]">
            <SlideBar></SlideBar>
            <main>{children}</main>
        </div>
    );
}

export default DashBoardLayout;
