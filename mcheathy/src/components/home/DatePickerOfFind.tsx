"use client";

import React, { useState } from "react";
import { Calendar } from "../ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import DoctorItem from "../doctor/DoctorItem";
function DatePickerOfFind() {
    const [date, setDate] = useState<Date | undefined>(new Date());
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
                {new Array(6).fill(0).map((item, index) => (
                    <DoctorItem
                        item={{
                            dob: "",
                            address: "",
                            avatar: "",
                            email: "",
                            fees: 0,
                            name: "",
                            password: "",
                            phone: "",
                            speciality: "",
                        }}
                        width="100px"
                        height="125px"
                        key={index}
                    ></DoctorItem>
                ))}
            </div>
        </div>
    );
}

export default DatePickerOfFind;
