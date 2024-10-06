import { Doctor } from "@/lib/interface";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

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
    dateTime: Date;
}) {
    return (
        <div
            {...props}
            className={` p-8 border rounded-xl border-textBlue bg-lightBlue dark:border-primaryGray dark:bg-darkBackground items-center ${
                isFlex ? " flex flex-row gap-8 items-center" : ""
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
            <div className="mb-4">
                <p className="mt-5 text-xl font-bold break-words max-w-[150px] text-wrap line-clamp-1">
                    {item.name}
                </p>
                <p className="text-primaryGray">{item.speciality}</p>
            </div>
            <Button className=" bg-textBlue">
                <Link href={`book-appointment?doctorId=${item._id}`}>Book</Link>
            </Button>
        </div>
    );
}

export default DoctorItem;
