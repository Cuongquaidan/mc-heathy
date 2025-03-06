
import { Topic } from "@/lib/interface";
import Image from "next/image";
import React from "react";
import moment from "moment";
import Link from "next/link";

function TopicItem({ item, ...props }: { item: Topic }) {
    return (
        <Link
            {...props}
            className="flex flex-col w-[30%] gap-4 p-5 border shadow-lg cursor-pointer rounded-xl"
            href={`/topics/topic-details?topicId=${item._id}`}
        >
            <div className="flex justify-between">
                <h2 className="text-3xl italic font-bold ">{item.title}</h2>
                <div className="text-sm italic">
                    <p>
                        Created at:{" "}
                        {moment(item.createdAt).format("DD-MM-YYYY")}
                    </p>
                    <p>Updated at: {moment(item.updatedAt).fromNow()}</p>
                </div>
            </div>
            <Image
                src={item.thumb}
                alt={item.title}
                width={100}
                height={100}
                className="rounded w-full h-[300px] object-cover mx-auto"
            />
        </Link>
    );
}

export default TopicItem;
