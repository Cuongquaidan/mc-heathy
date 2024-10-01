"use client";

import React, { useEffect, useState } from "react";
import { Calendar } from "../ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import DoctorItem from "../doctor/DoctorItem";
import { Doctor } from "@/lib/interface";
function DatePickerOfFind() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [list, setList] = useState<Doctor[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/doctors/getAvailableDoctorsByDate?date=${date}`
            );
            if (!response) throw new Error("Fetch data failed");

            const data: Doctor[] = await response.json();
            setList(data);
        };
        fetchData();
    }, [date]);
    return (
        <div>
            <Popover>
                <PopoverTrigger className="text-xl italic font-bold">
                    Select date: {date?.toLocaleDateString("en-GB")}
                </PopoverTrigger>
                <PopoverContent>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="border rounded-md "
                    />
                </PopoverContent>
            </Popover>
            <div className="grid grid-cols-3 gap-10 p-10">
                {list.map((item, index) => (
                    <DoctorItem
                        item={item}
                        width="100px"
                        height="125px"
                        isFlex={true}
                        key={index}
                    ></DoctorItem>
                ))}
            </div>
        </div>
    );
}

export default DatePickerOfFind;
