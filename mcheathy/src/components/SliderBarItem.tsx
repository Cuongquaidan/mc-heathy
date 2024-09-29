"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function SliderBarItem({
    name,
    url,
    icon,
}: {
    name: string;
    url: string;
    icon: React.ReactNode;
}) {
    const pathName = usePathname();
    const isActive = url == pathName;
    return (
        <li className="w-full">
            <Link
                href={url}
                className={`flex items-center justify-start w-full gap-5 px-5 py-3 text-xl transition-colors duration-300 cursor-pointer group text-primaryGray hover:bg-lightBlue ${
                    isActive ? "bg-lightBlue" : ""
                }`}
            >
                <span
                    className={`size-6 ${
                        isActive ? "text-textBlue" : "text-primaryGray"
                    }`}
                >
                    {icon}
                </span>
                <span
                    className={`transition-colors duration-300 text-primaryGray group-hover:text-textBlue ${
                        isActive ? "text-textBlue" : ""
                    }`}
                >
                    {name}
                </span>
            </Link>
        </li>
    );
}

export default SliderBarItem;
