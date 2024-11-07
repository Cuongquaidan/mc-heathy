"use client";
import useFetchData from "@/hooks/useFetchData";
import { Topic } from "@/lib/interface";
import { useTokenStorage } from "@/store/store";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";
import DOMPurify from "dompurify";
function TopicDetailsPage() {
    const paramsSearch = useSearchParams();
    const id = paramsSearch.get("topicId");
    const accessToken = useTokenStorage((state) => state.accessToken);
    const { data: topic, error } = useFetchData<Topic>(
        `${process.env.NEXT_PUBLIC_API_URL}/topics/getById?topicId=${id}`,
        "Fetch data failed",
        accessToken || " "
    );
    if (error) return <div>{error}</div>;
    return (
        <div>
            {topic && (
                <div className="flex flex-col items-center gap-10 w-[70%] mx-auto pb-20">
                    <Image
                        src={topic?.thumb}
                        alt={topic?.title}
                        width={100}
                        height={100}
                        className="w-[60%] h-[500px] object-cover"
                    ></Image>
                    <h2 className="text-3xl font-bold">{topic.title}</h2>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(topic.content),
                        }}
                    ></div>
                </div>
            )}
        </div>
    );
}

export default TopicDetailsPage;
