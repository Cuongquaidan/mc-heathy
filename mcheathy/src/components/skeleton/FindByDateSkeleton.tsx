import React from "react";
import DatePickerOfFingSkeleton from "./DatePickerOfFingSkeleton";
import { Skeleton } from "../ui/skeleton";

function FindByDateSkeleton() {
    return (
        <div className="flex flex-col items-center mx-auto mt-40">
            <Skeleton className="w-[150px] h-4"></Skeleton>
            <Skeleton className="w-[250px] h-4"></Skeleton>
            <div className="w-full mt-5">
                <DatePickerOfFingSkeleton></DatePickerOfFingSkeleton>
            </div>
        </div>
    );
}

export default FindByDateSkeleton;
