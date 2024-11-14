"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useFetchData from "@/hooks/useFetchData";
import { Appointment } from "@/lib/interface";

import { useTokenStorage } from "@/store/store";
import { useRouter } from "next/navigation";
import { Pagination } from "antd";
import type { PaginationProps } from "antd";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useChatContext } from "@/context/ChatContext";
import { toast } from "react-toastify";

function TableAppointmentsDoctor() {
    const accessToken = useTokenStorage((state) => state.accessToken);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [appointmentsList, setAppointmentsList] = useState<
        Appointment[] | undefined
    >(undefined);
    const [total, setTotal] = useState(0);

    const { setShowChat, setCurrentChats, currentChats } = useChatContext();
    const { data, error } = useFetchData<{
        appointmentsList: Appointment[];
        total: number;
    }>(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments/getByDoctorIdPagination?page=${page}&limit=${limit}`,
        "Fetch data failed",
        accessToken || " "
    );
    useEffect(() => {
        setAppointmentsList(data?.appointmentsList);
        setTotal(data?.total ?? 0);
    }, [data?.appointmentsList, data?.total]);
    const router = useRouter();
    if (!accessToken) {
        router.push("/login");
    }

    const onChange: PaginationProps["onChange"] = (pageNumber) => {
        setLimit(10);
        setPage(pageNumber);
    };
    const handleAddChat = async (firstId: string, secondId: string) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/chats/`,
                {
                    method: "POST",
                    body: JSON.stringify({ firstId, secondId }),
                    headers: {
                        "Content-Type": "application/json",
                        authorization: accessToken || "Bear ",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to add chat");
            }
            const resjson = await response.json();
            const chatExists = currentChats.some(
                (chat) => chat._id === resjson._id
            );

            if (!chatExists) {
                setCurrentChats([...currentChats, resjson]);
            }
        } catch (error) {
            toast.error(String(error));
        }
    };
    if (error) return <div>{error}</div>;
    return (
        <div className="min-h-screen p-10">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Doctor phone</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Patient phone</TableHead>
                        <TableHead>Fees</TableHead>
                        <TableHead>Date & Time</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {appointmentsList?.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage src={item.doctorAvatar} />
                                    <AvatarFallback>
                                        {item.doctorName}
                                    </AvatarFallback>
                                </Avatar>
                                {item.doctorName}
                            </TableCell>
                            <TableCell>{item.doctorPhone}</TableCell>
                            <TableCell className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage src={item.userAvatar} />
                                    <AvatarFallback>
                                        {item.userName}
                                    </AvatarFallback>
                                </Avatar>
                                {item.userName}
                            </TableCell>
                            <TableCell>{item.userPhone}</TableCell>
                            <TableCell>{item.fees}</TableCell>
                            <TableCell>
                                {new Date(item.dateTime).toLocaleString(
                                    "en-US",
                                    {
                                        timeZone: "UTC",
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                        hour: "numeric",
                                        minute: "numeric",
                                        hour12: true,
                                    }
                                )}
                            </TableCell>
                            <TableCell>
                                <div
                                    className="p-2 font-bold text-center bg-green-500 cursor-pointer"
                                    onClick={() => {
                                        handleAddChat(
                                            item.userId,
                                            item.doctorId
                                        );

                                        setShowChat(true);
                                    }}
                                >
                                    Chat
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex justify-center w-full mt-5">
                {total > (page - 1) * 20 + 10 && (
                    <div>
                        {limit === 20 ? (
                            <Button
                                onClick={() => {
                                    setLimit(10);
                                }}
                                className="font-bold text-red-700 bg-red-300 hover:bg-red-200 hover:scale-95 dark:text-red-700 dark:bg-red-300 dark:hover:bg-red-200 dark:hover:scale-95"
                            >
                                Hide
                            </Button>
                        ) : (
                            <Button
                                onClick={() => setLimit(20)}
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

export default TableAppointmentsDoctor;
