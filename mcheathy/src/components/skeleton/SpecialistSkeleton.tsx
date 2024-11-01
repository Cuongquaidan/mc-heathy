import React from "react";
import { Skeleton } from "../ui/skeleton";
import DoctorItemSkeleton from "./DoctorItemSkeleton";

function SpecialistSkeleton() {
    return (
        <div className="grid grid-cols-[1fr,4fr] gap-20 mt-10">
            <div className="flex flex-col gap-5">
                <Skeleton className="h-12 w-60"></Skeleton>
                <Skeleton className="h-12 w-60"></Skeleton>
                <Skeleton className="h-12 w-60"></Skeleton>
                <Skeleton className="h-12 w-60"></Skeleton>
                <Skeleton className="h-12 w-60"></Skeleton>
                <Skeleton className="h-12 w-60"></Skeleton>
            </div>
            <div className="flex flex-wrap">
                <DoctorItemSkeleton></DoctorItemSkeleton>
                <DoctorItemSkeleton></DoctorItemSkeleton>
                <DoctorItemSkeleton></DoctorItemSkeleton>
                <DoctorItemSkeleton></DoctorItemSkeleton>
            </div>
        </div>
    );
}

export default SpecialistSkeleton;
