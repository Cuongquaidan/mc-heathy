import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function loading() {
    return (
        <div className="max-w-[100%] w-[1400px] mx-auto flex flex-col items-center py-10 min-h-screen">
            <Skeleton className="h-4 w-[250px]" />
            <div className="flex gap-10 mt-10">
                <Skeleton className="w-[400px] h-[400px]"></Skeleton>
                <div className="flex flex-col justify-between p-5">
                    <Skeleton className="h-4 w-[350px]" />
                    <Skeleton className="h-4 w-[350px]" />
                    <Skeleton className="h-4 w-[350px]" />
                    <Skeleton className="h-4 w-[350px]" />
                    <Skeleton className="h-4 w-[350px]" />
                    <Skeleton className="h-4 w-[350px]" />
                    <Skeleton className="h-4 w-[350px]" />
                </div>
            </div>
            <div className="w-full mt-20">
                <Skeleton className="h-4 w-[250px]" />
                <div className="grid grid-cols-3 mt-10 ">
                    <div className="p-10 border border-primaryGray">
                        <Skeleton className="h-4 w-[100px]" />
                        <div className="flex flex-col gap-5 mt-10 ">
                            <Skeleton className="h-4 w-[150px]" />
                            <Skeleton className="h-4 w-[150px]" />
                        </div>
                    </div>
                    <div className="p-10 border border-primaryGray border-x-0">
                        <Skeleton className="h-4 w-[100px]" />
                        <div className="flex flex-col gap-5 mt-10 text-primaryGray">
                            <Skeleton className="h-4 w-[150px]" />
                            <Skeleton className="h-4 w-[150px]" />
                        </div>
                    </div>
                    <div className="p-10 border border-primaryGray border-x-0">
                        <Skeleton className="h-4 w-[100px]" />
                        <div className="flex flex-col gap-5 mt-10 text-primaryGray">
                            <Skeleton className="h-4 w-[150px]" />
                            <Skeleton className="h-4 w-[150px]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default loading;
