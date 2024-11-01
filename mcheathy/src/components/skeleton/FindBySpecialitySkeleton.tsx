import React from "react";
import SpecialityItemSkeleton from "./SpecialityItemSkeleton";
import { Skeleton } from "../ui/skeleton";

function FindBySpecialitySkeleton() {
    return (
        <div className="flex flex-col items-center mx-auto mt-40">
            <Skeleton className="h-4 w-[100px]"></Skeleton>
            <Skeleton className="h-4 w-[150px]"></Skeleton>
            <Skeleton className="h-4 w-[150px]"></Skeleton>

            <div className="flex gap-10 mt-5">
                <SpecialityItemSkeleton></SpecialityItemSkeleton>
                <SpecialityItemSkeleton></SpecialityItemSkeleton>
                <SpecialityItemSkeleton></SpecialityItemSkeleton>
                <SpecialityItemSkeleton></SpecialityItemSkeleton>
                <SpecialityItemSkeleton></SpecialityItemSkeleton>
                <SpecialityItemSkeleton></SpecialityItemSkeleton>
            </div>
            <Skeleton className="w-16 h-6 mt-5"></Skeleton>
        </div>
    );
}

export default FindBySpecialitySkeleton;
