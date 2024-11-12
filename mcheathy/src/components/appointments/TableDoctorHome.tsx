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
import { useEffect, useState } from "react";

function TableDoctorHome() {
    const accessToken = useTokenStorage((state) => state.accessToken);
    const [appointmentsList, setAppointmentsList] = useState<
        Appointment[] | undefined
    >(undefined);

    const { data, error } = useFetchData<{
        appointmentsList: Appointment[];
        total: number;
    }>(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments/getAppointmentInNext3DaysByDoctorId`,
        "Fetch data failed",
        accessToken || " "
    );
    useEffect(() => {
        setAppointmentsList(data?.appointmentsList);
    }, [data?.appointmentsList, data?.total]);
    const router = useRouter();
    if (!accessToken) {
        router.push("/doctor-login");
    }

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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default TableDoctorHome;
