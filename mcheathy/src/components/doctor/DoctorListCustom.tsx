import { Doctor } from "@/lib/interface";
import React from "react";
import DoctorItem from "./DoctorItem";

function DoctorListCustom({ data }: { data: Doctor[] }) {
    return (
        <div className="flex flex-wrap gap-10">
            {data?.map((item, index) => (
                <DoctorItem
                    isFlex={false}
                    width="150px"
                    height="180px"
                    item={item}
                    key={index}
                ></DoctorItem>
            ))}
        </div>
    );
}

export default DoctorListCustom;
