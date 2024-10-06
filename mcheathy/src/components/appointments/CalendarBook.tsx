"use client";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Button } from "../ui/button";
import useFetchData from "@/hooks/useFetchData";
import { Appointment } from "@/lib/interface";
import Image from "next/image";

function CalendarBook({ doctorId }: { doctorId: string }) {
    const appointment = {
        userId: "1231",
        dateTime: new Date("2025-12-31T17:10:00.000+00:00"),
        doctorId: "66f8921ee78fe6c36f346cd3",
        doctorName: "Messi",
        userName: "Nguyễn Thị Bé Tư",
        doctorAvatar:
            "https://images.pexels.com/photos/6800942/pexels-photo-6800942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        doctorPhone: "0123123123",
        userAvatar:
            "https://images.pexels.com/photos/6800942/pexels-photo-6800942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        userPhone: "0909090909",
        fees: 600,
    };
    const { data: appointmentsList, error } = useFetchData<Appointment[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/appointment/getByDoctorId?doctorId=${doctorId}`
    );

    const unavailableDay =
        appointmentsList?.map((item) => new Date(item.dateTime)) || [];
    console.log(unavailableDay);
    const selectedDate = new Date("2024-10-7");
    type ValuePiece = Date | null;
    type Value = ValuePiece | [ValuePiece, ValuePiece];

    const [value, onChange] = useState<Value>(selectedDate || new Date());

    const isUnavailable = (date: Date) => {
        return unavailableDay.some(
            (unavailable) =>
                unavailable.getFullYear() === date.getFullYear() &&
                unavailable.getMonth() === date.getMonth() &&
                unavailable.getDate() === date.getDate()
        );
    };

    if (error) return <div>{error}</div>;
    return (
        <div className="flex gap-10">
            <div className="flex flex-col items-center gap-5">
                <Image
                    src={appointment.doctorAvatar}
                    alt={appointment.doctorName}
                    width={100}
                    height={100}
                    className="w-[300px] h-[400px]"
                ></Image>
                <p className="text-2xl font-bold">{appointment.doctorName}</p>
                <p className="text-xl font-bold text-green-500">
                    Fees: {appointment.fees}
                </p>
            </div>
            <div className="flex-1">
                <Calendar
                    onChange={onChange}
                    locale="en-US"
                    value={value}
                    tileClassName={({ date }) =>
                        ` ${isUnavailable(date) ? "unavailable-day" : ""}`
                    }
                />
                <div className="flex items-center gap-20 mt-8">
                    <p className="text-xl font-semibold ">
                        Ngày được chọn:{" "}
                        {value instanceof Date ? value.toDateString() : ""}
                    </p>
                    <Button className="bg-textBlue hover:bg-blue-400">
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CalendarBook;
