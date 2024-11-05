import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function loading() {
    return (
        <div className="flex flex-col p-10 ">
            <div className="space-y-8 w-[full] items-center flex flex-col">
                <Skeleton className="rounded-full mx-auto w-[200px] h-[200px]"></Skeleton>

                <div className="grid w-full grid-cols-2 gap-10 p-20 ">
                    <Skeleton className="flex-1 h-10 rounded-lg"></Skeleton>
                    <Skeleton className="flex-1 h-10 rounded-lg"></Skeleton>
                    <Skeleton className="flex-1 h-10 rounded-lg"></Skeleton>
                    <Skeleton className="flex-1 h-10 rounded-lg"></Skeleton>
                    <Skeleton className="flex-1 h-10 rounded-lg"></Skeleton>
                    <Skeleton className="flex-1 h-10 rounded-lg"></Skeleton>
                    <Skeleton className="flex-1 h-10 rounded-lg"></Skeleton>
                    <Skeleton className="flex-1 h-10 rounded-lg"></Skeleton>
                </div>

                <Skeleton className="w-[100%] h-10"></Skeleton>
            </div>
        </div>
    );
}

export default loading;
