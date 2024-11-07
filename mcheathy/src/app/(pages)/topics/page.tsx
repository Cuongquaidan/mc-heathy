import TopicsList from "@/components/topics/TopicsList";
import React from "react";

function TopicsPage() {
    return (
        <div className="p-10 py-20 mb-20">
            <h2 className="py-5 mb-10 text-3xl italic font-bold underline">
                Newest topics
            </h2>
            <TopicsList></TopicsList>
        </div>
    );
}

export default TopicsPage;
