import Banner from "@/components/skeleton/Banner";
import FindByDateSkeleton from "@/components/skeleton/FindByDateSkeleton";
import FindBySpecialitySkeleton from "@/components/skeleton/FindBySpecialitySkeleton";
import React from "react";

function loading() {
    return (
        <div className="w-[1400px] max-w-[100%] mx-auto pb-44">
            <Banner></Banner>
            <FindBySpecialitySkeleton></FindBySpecialitySkeleton>
            <FindByDateSkeleton></FindByDateSkeleton>
        </div>
    );
}

export default loading;
