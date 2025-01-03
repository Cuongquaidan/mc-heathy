import TopicsListAdmin from "@/components/topics/TopicsListAdmin";
import React from "react";

function TopicsPage() {
    return (
        <div className="p-10">
            <h2 className="py-5 mb-10 text-3xl italic font-bold underline">
                Manage topics
            </h2>
            <TopicsListAdmin></TopicsListAdmin>
        </div>
    );
}

export default TopicsPage;
