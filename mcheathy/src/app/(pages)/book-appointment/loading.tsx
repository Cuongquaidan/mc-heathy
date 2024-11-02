import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function loading() {
    return (
        <div className="w-[1400px] max-w-screen mx-auto py-28">
            <div className="flex gap-10">
                <div className="flex flex-col items-center gap-5">
                    <Skeleton className="w-[300px] h-[400px]"></Skeleton>
                    <Skeleton className="w-[100px] h-5"></Skeleton>
                    <Skeleton className="w-[150px] h-5"></Skeleton>
                </div>
                <div className="flex-1">
                    <Skeleton className="w-[700px] h-[400px]"></Skeleton>
                    <div className="flex items-center gap-20 mt-8">
                        <Skeleton className="w-[150px] h-4"></Skeleton>
                        <Skeleton className="w-[200px] h-10"></Skeleton>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default loading;
