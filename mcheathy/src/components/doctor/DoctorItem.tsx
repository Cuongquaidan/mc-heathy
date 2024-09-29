import { Doctor } from "@/lib/interface";
import Image from "next/image";
import React from "react";

function DoctorItem({ item, ...props }: { item: Doctor }) {
    return (
        <div
            {...props}
            className="p-8 border rounded-xl border-textBlue bg-lightBlue"
        >
            <Image
                src={item.avatar}
                alt={item.name}
                width={200}
                height={300}
                objectFit="cover"
                style={{ borderRadius: "8px", width: "200px", height: "250px" }}
            />
            <p className="mt-5 text-xl font-bold break-words w-[200px] text-wrap">
                {item.name}
            </p>
            <p className="text-primaryGray">{item.speciality}</p>
        </div>
    );
}

export default DoctorItem;
