import { Doctor } from "@/lib/interface";
import Image from "next/image";
import React from "react";

function DoctorItem({
    item,
    width,
    height,
    isFlex,
    ...props
}: {
    item: Doctor;
    width: string;
    height: string;
    isFlex: boolean;
}) {
    return (
        <div
            {...props}
            className={`p-8 border rounded-xl border-textBlue bg-lightBlue dark:border-primaryGray ${
                isFlex ? "flex gap-8" : ""
            }`}
        >
            <Image
                src={item.avatar}
                alt={item.name}
                width={200}
                height={300}
                objectFit="cover"
                style={{ borderRadius: "8px", width: width, height: height }}
            />
            <div>
                <p className="mt-5 text-xl font-bold break-words w-[200px] text-wrap">
                    {item.name}
                </p>
                <p className="text-primaryGray">{item.speciality}</p>
            </div>
        </div>
    );
}

export default DoctorItem;
