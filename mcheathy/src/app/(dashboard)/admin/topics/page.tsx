import TopicsListAdmin from "@/components/topics/TopicsListAdmin";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function TopicsPage() {
    return (
        <div className="p-10">
           <div className="flex justify-between"> <h2 className="py-5 mb-10 text-3xl italic font-bold underline">
                Manage topics
            </h2>
            <Button>
                <Link href={"/admin/topics/add-topic"}>Add topic</Link>
            </Button></div>
            <TopicsListAdmin></TopicsListAdmin>
        </div>
    );
}

export default TopicsPage;
