import React from "react";
import { Skeleton } from "../ui/skeleton";
import DoctorItemSkeleton from "./DoctorItemSkeleton";

function DatePickerOfFingSkeleton() {
    return (
        <div>
            <Skeleton className="w-[150px] h-4"></Skeleton>
            <div className="grid grid-cols-3 gap-10 p-10">
                <DoctorItemSkeleton></DoctorItemSkeleton>
                <DoctorItemSkeleton></DoctorItemSkeleton>
                <DoctorItemSkeleton></DoctorItemSkeleton>
                <DoctorItemSkeleton></DoctorItemSkeleton>
                <DoctorItemSkeleton></DoctorItemSkeleton>
                <DoctorItemSkeleton></DoctorItemSkeleton>
            </div>
        </div>
    );
}

export default DatePickerOfFingSkeleton;
