"use client";
import { Doctor } from "@/lib/interface";
import React, { useEffect, useState } from "react";
import DoctorItem from "./DoctorItem";

function DoctorsList() {
    const [list, setList] = useState<Doctor[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/doctors/getAll`
                );
                if (!response.ok) throw new Error("Fetch data failed");
                console.log(response);
                const data: Doctor[] = await response.json();
                console.log(data);
                setList(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="flex flex-wrap gap-20 p-10">
            {list.map((item) => (
                <DoctorItem item={item} key={item._id}></DoctorItem>
            ))}
        </div>
    );
}

export default DoctorsList;
