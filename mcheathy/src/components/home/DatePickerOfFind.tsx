"use client";

import React, { useState } from "react";
import { Calendar } from "../ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import DoctorItem from "../doctor/DoctorItem";
import { Doctor } from "@/lib/interface";
import useFetchData from "@/hooks/useFetchData";
import { useTokenStorage } from "@/store/store";
import { useRouter } from "next/navigation";
function DatePickerOfFind() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const accessToken = useTokenStorage((state) => state.accessToken);
    const router = useRouter();
    const { data: doctors, error } = useFetchData<Doctor[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/doctors/getAvailableDoctorsByDate?date=${date}`,
        "Fetch data failed",
        accessToken || " "
    );
    if (error) return <div>{error}</div>;
    if (!accessToken) {
        router.push("/login");
    }
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
                {doctors?.map((item, index) => (
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
