import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function loading() {
    return (
        <div className="flex flex-col min-h-screen max-w-screen  w-[900px] mx-auto items-center">
            <Skeleton className="h-4 w-[100px]" />

            <div className="flex gap-10 mt-10">
                <Skeleton className="h-[400px] w-[400px]" />
                <div className="flex flex-col justify-between p-5">
                    <Skeleton className="h-4 w-[150px]" />
                    <div>
                        <div>
                            <Skeleton className="h-4 w-[100px]" />
                            <Skeleton className="h-4 w-[150px]" />
                        </div>
                        <div>
                            <Skeleton className="h-4 w-[100px]" />
                            <Skeleton className="h-4 w-[150px]" />
                        </div>
                    </div>
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-10 w-[60px]" />
                </div>
            </div>
        </div>
    );
}

export default loading;
