import React from "react";
import NotFoundImage from "@/public/assets/images/notfound.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Not found",
    description:
        "McHeathy is a comprehensive healthcare platform designed to offer fast, safe, and reliable health protection services. Our mission is to prioritize your well-being by providing easy access to healthcare professionals and services. With McHeathy, you can quickly book appointments with qualified doctors, schedule health consultations, and manage your medical needs with ease.Our platform is built to ensure the highest level of safety and privacy for users, enabling you to find the right care at the right time. Whether you're seeking preventative care, specialist consultations, or regular check-ups, McHeathy is here to make your healthcare experience seamless, secure, and efficient ",
};
function NotFoundPage() {
    return (
        <div className="w-full min-h-screen bg-darkBackground">
            <div className="flex items-center w-[1400px] max-w-[100%] mx-auto justify-center">
                <div className="flex flex-col items-center">
                    <Image
                        src={NotFoundImage}
                        alt="Not found page"
                        className=" animate-pulse"
                        style={{
                            animationDuration: "10s",
                        }}
                    ></Image>
                    <Button className="h-16 text-2xl font-bold underline bg-textBlue">
                        <Link href={"/home"}>Back To Home</Link>
                    </Button>
                </div>
                <div className="flex flex-col items-center">
                    <div
                        className="flex italic font-bold text-red-600 text-[200px] animate-bounce "
                        style={{
                            animationDuration: "8s",
                        }}
                    >
                        <p>4</p>
                        <p className="px-5 pt-5">0</p>
                        <p>4</p>
                    </div>
                    <div className="text-red-600 text-[30px]">
                        Page not found
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFoundPage;
