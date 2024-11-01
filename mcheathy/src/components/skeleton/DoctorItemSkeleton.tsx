import React from "react";
import { Skeleton } from "../ui/skeleton";

function DoctorItemSkeleton() {
    return (
        <div>
            <Skeleton className="w-[150px] h-[180px]"></Skeleton>
            <div className="mb-4">
                <Skeleton className="w-[100px] h-4"></Skeleton>
                <Skeleton className="w-[100px] h-4"></Skeleton>
            </div>
            <Skeleton className="w-[50px] h-[25px]"></Skeleton>
        </div>
    );
}

export default DoctorItemSkeleton;
