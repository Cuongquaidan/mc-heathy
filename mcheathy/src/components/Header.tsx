"use client";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

function Header() {
    const pathName = usePathname();
    const { setTheme } = useTheme();
    return (
        <div className="max-w-[100%] p-10 flex justify-between items-center">
            <Link
                href={"/home"}
                className="p-5 text-2xl italic font-bold tracking-widest rounded-lg text-textBlue bg-lightBlue dark:text-white dark:bg-black dark:border-slate-500 dark:border"
            >
                MCHeathy
            </Link>
            <div className="flex gap-10 text-xl font-semibold">
                <Link
                    href={"/home"}
                    className={
                        pathName == "/home"
                            ? "border-b-textBlue border-b-4 dark:border-b-slate-500"
                            : ""
                    }
                >
                    HOME
                </Link>
                <Link
                    href={"/all-doctors"}
                    className={
                        pathName == "/all-doctors"
                            ? "border-b-textBlue border-b-4 dark:border-b-slate-500"
                            : ""
                    }
                >
                    ALL DOCTORS
                </Link>
                <Link
                    href={"/about"}
                    className={
                        pathName == "/about"
                            ? "border-b-textBlue border-b-4 dark:border-b-slate-500"
                            : ""
                    }
                >
                    ABOUT
                </Link>
                <Link
                    href={"/contact"}
                    className={
                        pathName == "/contact"
                            ? "border-b-textBlue border-b-4 dark:border-b-slate-500"
                            : ""
                    }
                >
                    CONTACT
                </Link>
            </div>
            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    className="p-6 font-bold text-white bg-textBlue"
                >
                    Create account
                </Button>

                <div className="flex">
                    <SunIcon
                        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                        onClick={() => {
                            setTheme("dark");
                        }}
                    />
                    <MoonIcon
                        className="absolute h-[1.2rem] w-[1.2rem]  rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                        onClick={() => {
                            setTheme("light");
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Header;
