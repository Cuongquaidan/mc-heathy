import React from "react";
import { Skeleton } from "../ui/skeleton";

function Banner() {
    return (
        <div className="flex items-center  justify-around p-20  w-[100%] mx-auto rounded-3xl dark:bg-black dark:border dark:border-t-2 dark:border-slate-500">
            <div className="items-center ">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="w-[160px] h-12"></Skeleton>
            </div>
            <Skeleton className="w-[500px] h-[300px]"></Skeleton>
        </div>
    );
}

export default Banner;
