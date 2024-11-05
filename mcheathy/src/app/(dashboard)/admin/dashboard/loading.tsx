import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function loading() {
    return (
        <div>
            <div className="flex items-center justify-between gap-5 px-10 py-4 ">
                <Skeleton className="w-[100px] h-4"></Skeleton>

                <Skeleton className="w-20 h-20 p-3 rounded-full"></Skeleton>
            </div>
            <div className="flex items-center justify-between gap-5 px-10 py-4 ">
                <Skeleton className="w-[100px] h-4"></Skeleton>

                <Skeleton className="w-20 h-20 p-3 rounded-full"></Skeleton>
            </div>
            <Skeleton className="w-[800px] mt-10 mx-auto h-[400px]"></Skeleton>
        </div>
    );
}

export default loading;
