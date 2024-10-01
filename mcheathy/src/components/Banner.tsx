import Image from "next/image";
import React from "react";
import banner from "@/public/assets/images/banner.png";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
function Banner() {
    return (
        <div className="flex items-center  justify-around p-20 bg-textBlue w-[100%] mx-auto rounded-3xl dark:bg-black dark:border dark:border-t-2 dark:border-slate-500">
            <div className="items-center text-3xl font-bold text-white">
                <p>Book Appointment</p>
                <p> With Trusted Doctors</p>
                <Button className="flex gap-5 mt-5 font-bold text-black bg-white hover:bg-gray-200 hover:text-blue-600">
                    Book appointment <ArrowRightIcon width={20} />
                </Button>
            </div>
            <Image
                src={banner}
                alt="Banner"
                width={500}
                height={300}
                className="flex-shrink"
            />
        </div>
    );
}

export default Banner;
