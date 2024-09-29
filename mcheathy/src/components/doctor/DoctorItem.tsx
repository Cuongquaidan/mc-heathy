import { Doctor } from "@/lib/interface";
import Image from "next/image";
import React from "react";

function DoctorItem({ item, ...props }: { item: Doctor }) {
    return (
        <div {...props}>
            <Image
                src={item.avatar}
                alt={item.name}
                width={250}
                height={300}
                objectFit="cover"
                style={{ borderRadius: "8px" }}
            />
            <p className="mt-5 text-xl font-bold break-words w-[250px] text-wrap">
                {item.name}
            </p>
            <p className="text-primaryGray">{item.speciality}</p>
        </div>
    );
}

export default DoctorItem;
