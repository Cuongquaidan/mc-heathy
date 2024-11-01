import React from "react";
import { Skeleton } from "../ui/skeleton";

function SpecialityItemSkeleton() {
    return (
        <div className="flex flex-col items-center gap-4 max-w-30">
            <div className="flex items-center justify-center p-4 rounded-full w-26 h-26 bg-light-gradient dark:bg-dark-gradient dark:border dark:border-t-2 dark:border-slate-500">
                <Skeleton className="w-16 h-16 rounded-full"></Skeleton>
            </div>
            <Skeleton className="w-[150px] h-4"></Skeleton>
        </div>
    );
}

export default SpecialityItemSkeleton;
