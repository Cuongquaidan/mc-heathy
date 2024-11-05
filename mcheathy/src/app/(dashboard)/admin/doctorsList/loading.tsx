import DoctorItemSkeleton from "@/components/skeleton/DoctorItemSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function loading() {
    return (
        <div className="p-5">
            <Skeleton className="w-[150px] h-4"></Skeleton>
            <div className="flex flex-wrap gap-10">
                {new Array(8)?.map((item, index) => (
                    <DoctorItemSkeleton key={index}></DoctorItemSkeleton>
                ))}
            </div>
        </div>
    );
}

export default loading;
