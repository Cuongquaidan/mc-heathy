"use client";
import { Speciality } from "@/lib/interface";
import React, { useEffect, useState } from "react";

function NumberOfSpecialitys() {
    const [list, setList] = useState<Speciality[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/specialitys/getAll`
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data: Speciality[] = await response.json();
                console.log(data);
                setList(data);
            } catch (error) {
                console.error("Error fetching specialitys:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex items-center justify-between gap-5 px-10 py-4 text-4xl font-bold border border-teal-500">
            Number of Specialitys:
            <div className="flex items-center justify-center w-20 h-20 p-3 text-center border rounded-full bg-lightBlue border-textBlue text-textBlue">
                {list.length}
            </div>
        </div>
    );
}

export default NumberOfSpecialitys;
