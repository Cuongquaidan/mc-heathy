"use client";
import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Appointment } from "@/lib/interface";
import { MdOutlineCancel } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
function TableAppointments() {
    const [list, setList] = useState<Appointment[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/appointments/getAll`
                );
                if (!response) {
                    throw new Error("Fetch data failed");
                }
                const data: Appointment[] = await response.json();
                setList(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="p-10">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Patient phone</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Doctor phone</TableHead>
                        <TableHead>Fees</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Delete</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {list.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
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
                                <MdOutlineCancel
                                    size={40}
                                    className="p-1 text-red-600 bg-red-300 rounded-full"
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default TableAppointments;