import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function loading() {
    return (
        <div className="p-5">
            <Skeleton className="w-[100px] h-5"></Skeleton>
            <Skeleton className="w-[100%] h-[150px]"></Skeleton>
            <div className="p-10">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr>
                            {Array.from({ length: 8 }, (_, index) => (
                                <th key={index} className="px-4 py-2 border">
                                    <Skeleton className="w-24 h-5" />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 10 }, (_, rowIndex) => (
                            <tr key={rowIndex}>
                                {Array.from({ length: 8 }, (_, cellIndex) => (
                                    <td
                                        key={cellIndex}
                                        className="px-4 py-2 border"
                                    >
                                        <Skeleton className="w-24 h-4" />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Skeleton className="w-16 h-5 mt-6 rounded-md"></Skeleton>
                <Skeleton className="w-20 h-5 mt-6 rounded-md"></Skeleton>
            </div>
        </div>
    );
}

export default loading;
