"use client";
import { Doctor } from "@/lib/interface";
import React, { useEffect, useState } from "react";

function NumberOfDoctors() {
    const [list, setList] = useState<Doctor[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/doctors/getAll`
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data: Doctor[] = await response.json();

                setList(data);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex items-center justify-between gap-5 px-10 py-4 text-4xl font-bold border border-teal-500">
            Number of Doctors:
            <div className="flex items-center justify-center w-20 h-20 p-3 text-center border rounded-full bg-lightBlue border-textBlue text-textBlue">
                {list.length}
            </div>
        </div>
    );
}

export default NumberOfDoctors;
