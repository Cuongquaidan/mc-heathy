import AddTopic from "@/components/topics/AddTopic";
import React from "react";

function AddTopicPage() {
    return (
        <div className="p-10">
            <h2 className="py-5 text-2xl font-bold">
                We need an interesting topic
            </h2>
            <AddTopic></AddTopic>
        </div>
    );
}

export default AddTopicPage;
