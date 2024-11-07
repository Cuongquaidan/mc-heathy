"use client";
import useFetchData from "@/hooks/useFetchData";
import { Topic } from "@/lib/interface";
import { useTokenStorage } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import TopicItem from "./TopicItem";
import { Pagination, PaginationProps } from "antd";
import { Button } from "../ui/button";

function TopicsList() {
    const accessToken = useTokenStorage((state) => state.accessToken);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [topicsList, setTopicsList] = useState<Topic[] | undefined>(
        undefined
    );
    const { data, error } = useFetchData<{ total: number; topics: Topic[] }>(
        `${process.env.NEXT_PUBLIC_API_URL}/topics/getAll?page=${page}&limit=${limit}`,
        "Fetch data failed",
        accessToken || " "
    );
    useEffect(() => {
        setTopicsList(data?.topics);
    }, [data]);
    const total = data?.total || 0;
    const router = useRouter();
    if (!accessToken) {
        router.push("/login");
    }
    const onChange: PaginationProps["onChange"] = (pageNumber) => {
        setLimit(5);
        setPage(pageNumber);
    };
    if (error) return <div>{error}</div>;
    return (
        <div className="flex flex-col gap-10">
            {topicsList ? (
                <>
                    {topicsList.map((item, index) => (
                        // eslint-disable-next-line react/no-danger-with-children
                        <TopicItem item={item} key={index}></TopicItem>
                    ))}
                </>
            ) : (
                <div className="mx-auto text-3xl text-center">
                    Không có topic nào
                </div>
            )}
            <div className="flex justify-center w-full mt-5">
                {total > (page - 1) * 20 + 10 && (
                    <div>
                        {limit === 20 ? (
                            <Button
                                onClick={() => {
                                    setLimit(5);
                                }}
                                className="font-bold text-red-700 bg-red-300 hover:bg-red-200 hover:scale-95 dark:text-red-700 dark:bg-red-300 dark:hover:bg-red-200 dark:hover:scale-95"
                            >
                                Hide
                            </Button>
                        ) : (
                            <Button
                                onClick={() => setLimit(10)}
                                className="font-bold text-green-700 bg-green-300 hover:bg-green-200 hover:scale-110 dark:text-green-700 dark:bg-green-300 dark:hover:bg-green-200 dark:hover:scale-110"
                            >
                                Show more
                            </Button>
                        )}
                    </div>
                )}
            </div>
            <Pagination
                defaultCurrent={1}
                total={total}
                onChange={onChange}
                pageSize={20}
                className="flex items-center justify-center w-full p-3 mx-auto mt-5 font-bold "
            />
        </div>
    );
}

export default TopicsList;
