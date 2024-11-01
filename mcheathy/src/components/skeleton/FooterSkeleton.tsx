import React from "react";
import { Skeleton } from "../ui/skeleton";

function FooterSkeleton() {
    return (
        <div>
            <div className="grid grid-cols-2 gap-20 p-10">
                <div>
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[250px]" />
                </div>
                <div className="grid grid-cols-2 gap-20 p-10">
                    <div>
                        <Skeleton className="h-4 w-[150px]" />
                        <div className="flex items-center gap-5">
                            <Skeleton className="w-12 h-12 rounded-full" />
                            <Skeleton className="w-12 h-12 rounded-full" />
                            <Skeleton className="w-12 h-12 rounded-full" />
                            <Skeleton className="w-12 h-12 rounded-full" />
                        </div>
                    </div>
                    <div>
                        <Skeleton className="h-4 w-[250px]" />
                        <div className="mt-5">
                            <Skeleton className="h-4 w-[100px]" />
                            <Skeleton className="h-4 w-[100px]" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full py-4 text-center text-gray-500 border-t-2 border-gray-400 ">
                <p>Copyright © 2024 manhcuong18112004 - All Right Reserved.</p>
            </div>
        </div>
    );
}

export default FooterSkeleton;
