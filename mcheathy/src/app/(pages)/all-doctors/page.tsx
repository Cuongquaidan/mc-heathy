import React, { Suspense } from "react";
import { Metadata } from "next";
import Specialist from "@/components/speciality/Specialist";
import { Skeleton } from "@/components/ui/skeleton";
export const metadata: Metadata = {
    title: "All doctors",
    description:
        "McHeathy is a comprehensive healthcare platform designed to offer fast, safe, and reliable health protection services. Our mission is to prioritize your well-being by providing easy access to healthcare professionals and services. With McHeathy, you can quickly book appointments with qualified doctors, schedule health consultations, and manage your medical needs with ease.Our platform is built to ensure the highest level of safety and privacy for users, enabling you to find the right care at the right time. Whether you're seeking preventative care, specialist consultations, or regular check-ups, McHeathy is here to make your healthcare experience seamless, secure, and efficient ",
};
function AllDoctorsPage() {
    return (
        <div className="max-w-screen w-[1400px] mx-auto min-h-screen">
            <Suspense
                fallback={<Skeleton className="h-4 w-[150px]"></Skeleton>}
            >
                <p className="text-2xl italic">
                    Browse through the doctors specialist ( Re-click to disable
                    the filter )
                </p>
            </Suspense>

            <Specialist></Specialist>
        </div>
    );
}

export default AllDoctorsPage;
