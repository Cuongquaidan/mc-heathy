"use client";
import Link from "next/link";
import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUserStore, useTokenStorage } from "@/store/store";
import useFetchData from "@/hooks/useFetchData";
import { Doctor } from "@/lib/interface";
import HeaderSkeleton from "./skeleton/HeaderSkeleton";
function HeaderDoctor() {
    const pathName = usePathname();
    const { setTheme } = useTheme();

    const currentUserID = useCurrentUserStore((state) => state.id);
    const accessToken = useTokenStorage((state) => state.accessToken);
    const logout = useTokenStorage((state) => state.logout);
    const router = useRouter();
    const { data: doctor, error } = useFetchData<Doctor>(
        `${process.env.NEXT_PUBLIC_API_URL}/doctors/getDoctorByID?doctorId=${currentUserID}`,
        "Fetch data failed",
        accessToken || " "
    );
    if (error) router.push("/doctor-login");

    return (
        <Suspense fallback={<HeaderSkeleton />}>
            <div className="max-w-[100%] p-10 flex justify-between items-center px-36">
                <Link
                    href={"/home"}
                    className="p-5 text-2xl italic font-bold tracking-widest rounded-lg text-textBlue bg-lightBlue dark:text-darkTextPrimary dark:bg-darkBackground dark:border-slate-500 dark:border"
                >
                    MCHeathy
                </Link>
                <div className="flex gap-10 text-xl font-semibold">
                    <Link
                        href={"/doctor-home"}
                        className={
                            pathName == "/doctor-home"
                                ? "border-b-textBlue border-b-4 dark:border-b-slate-500"
                                : ""
                        }
                    >
                        HOME
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    {doctor ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="select-none">
                                    <AvatarImage src={doctor.avatar} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>
                                    {doctor.name}
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                <DropdownMenuSeparator />

                                <DropdownMenuItem
                                    onClick={() => {
                                        router.push("/doctor-appointments");
                                    }}
                                >
                                    Appointments
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />

                                <DropdownMenuItem
                                    onClick={() => {
                                        logout();
                                        router.push("/doctor-login");
                                    }}
                                >
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button
                            variant="outline"
                            className="p-6 font-bold text-white bg-textBlue"
                        >
                            Create account
                        </Button>
                    )}

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
        </Suspense>
    );
}

export default HeaderDoctor;
