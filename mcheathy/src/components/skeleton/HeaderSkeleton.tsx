import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function HeaderSkeleton() {
    return (
        <div className="flex items-center justify-between w-full">
            <Skeleton className="w-[184px] h-[74px]"></Skeleton>
            <div className="flex items-center gap-5">
                <Skeleton className="w-[60px] h-[30px]"></Skeleton>
                <Skeleton className="w-[60px] h-[30px]"></Skeleton>
                <Skeleton className="w-[60px] h-[30px]"></Skeleton>
                <Skeleton className="w-[60px] h-[30px]"></Skeleton>
            </div>
            <div className="flex gap-2">
                <Skeleton className="rounded-full w-14 h-14"></Skeleton>
                <Skeleton className="w-10 h-10 rounded-full"></Skeleton>
            </div>
        </div>
    );
}

export default HeaderSkeleton;
