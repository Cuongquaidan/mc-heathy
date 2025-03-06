"use client";

import React, { useState } from "react";
import variants from "@/helpers/variantsMotion";
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
import { motion } from "framer-motion";

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
        <motion.div variants={variants} initial="initial"
            whileInView={{ opacity: 1, scale: 1 }}
        >
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
                        isAdmin={false}
                        item={item}
                        width="100px"
                        height="125px"
                        isFlex={true}
                        key={index}
                    ></DoctorItem>
                ))}
            </div>
        </motion.div>
    );
}

export default DatePickerOfFind;
