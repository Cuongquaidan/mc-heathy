"use client";
import useFetchData from "@/hooks/useFetchData";
import { Topic } from "@/lib/interface";
import { useTokenStorage } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Pagination, PaginationProps } from "antd";
import { Button } from "../ui/button";
import moment from "moment";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
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
                        <div
                            key={index}
                            className="p-5 border rounded-lg shadow-lg"
                        >
                            <div className="flex justify-between">
                                <div className="">
                                    <h2 className="text-3xl italic font-bold ">
                                        {item.title}
                                    </h2>
                                    <div className="text-sm italic">
                                        <p>
                                            Created at:{" "}
                                            {moment(item.createdAt).format(
                                                "DD-MM-YYYY"
                                            )}
                                        </p>
                                        <p>
                                            Updated at:{" "}
                                            {moment(item.updatedAt).fromNow()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-around gap-2">
                                    
                                    <Button
                                        onClick={() => {
                                            Swal.fire({
                                                title: "Are you sure?",
                                                text: "You won't be able to revert this!",
                                                icon: "warning",
                                                showCancelButton: true,
                                                confirmButtonColor: "#3085d6",
                                                cancelButtonColor: "#d33",
                                                confirmButtonText:
                                                    "Yes, delete it!",
                                            }).then(async (result) => {
                                                if (result.isConfirmed) {
                                                    try {
                                                        const response =
                                                            await fetch(
                                                                `${process.env.NEXT_PUBLIC_API_URL}/topics/deleteTopic?topicId=${item._id}`,
                                                                {
                                                                    method: "DELETE",
                                                                    headers: {
                                                                        "Content-Type":
                                                                            "application/json",
                                                                        authorization: `Bearer ${accessToken}`,
                                                                    },
                                                                }
                                                            );
                                                        if (!response.ok) {
                                                            Swal.fire({
                                                                title: "Failed!",
                                                                text: "Delete failed",
                                                                icon: "error",
                                                            });
                                                        } else {
                                                            Swal.fire({
                                                                title: "Deleted!",
                                                                text: "Doctor has been deleted.",
                                                                icon: "success",
                                                            });
                                                            setTimeout(() => {
                                                                window.location.reload();
                                                            }, 3000);
                                                        }
                                                    } catch (error) {
                                                        toast.error(
                                                            String(error)
                                                        );
                                                    }
                                                }
                                            });
                                        }}
                                        className="font-bold text-red-600 bg-red-200 dark:text-red-600 dark:bg-red-200 hover:bg-red-100 dark:hover:bg-red-100 hover:scale-110"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
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
