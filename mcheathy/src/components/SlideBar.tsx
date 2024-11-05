"use client";
import React from "react";
import SliderBarItem from "./SliderBarItem";
import Home from "./icons/HomeIcon";
import PersonGroup from "./icons/PersonGroup";
import AddPerson from "./icons/AddPerson";
import { MdEditCalendar } from "react-icons/md";
import { useTheme } from "next-themes";
import { useCurrentUserStore, useTokenStorage } from "@/store/store";
import useFetchData from "@/hooks/useFetchData";
import { User } from "@/lib/interface";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import Back from "./icons/Back";
import { useRouter } from "next/navigation";

interface MenuItem {
    name: string;
    url: string;
    icon: React.ReactNode;
}

function SlideBar() {
    const { theme, setTheme } = useTheme();
    const currentUserID = useCurrentUserStore((state) => state.id);
    const accessToken = useTokenStorage((state) => state.accessToken);
    const logout = useTokenStorage((state) => state.logout);
    const router = useRouter();
    const { data: user, error } = useFetchData<User>(
        `${process.env.NEXT_PUBLIC_API_URL}/users/getUserByID?userID=${currentUserID}`,
        "Fetch data failed",
        accessToken || " "
    );
    if (error) return <div>{error}</div>;
    const menuItems: MenuItem[] = [
        {
            name: "DashBoard",
            url: "/admin/dashboard",
            icon: <Home />,
        },
        {
            name: "Doctors List",
            url: "/admin/doctorsList",
            icon: <PersonGroup />,
        },
        {
            name: "Add doctor",
            url: "/admin/add-doctor",
            icon: <AddPerson />,
        },
        {
            name: "Appointments",
            url: "/admin/appointments",
            icon: <MdEditCalendar />,
        },
    ];

    return (
        <div className="flex flex-col justify-between h-screen">
            <div className="fixed flex flex-col justify-between h-screen p-5 border-r-2 ">
                <div>
                    <h1 className="text-5xl font-bold cursor-pointer">
                        MCHeathy
                    </h1>
                    <ul className="flex flex-col items-start flex-1 gap-8 mt-16">
                        {menuItems.map((item) => (
                            <SliderBarItem
                                key={item.name}
                                name={item.name}
                                url={item.url}
                                icon={item.icon}
                            />
                        ))}
                        <SliderBarItem
                            key={"Back to home"}
                            name={"Back to home"}
                            url={"/home"}
                            icon={<Back></Back>}
                        />
                        <div
                            className="relative flex items-center w-full px-4 cursor-pointer"
                            onClick={() => {
                                setTheme(theme === "dark" ? "light" : "dark");
                            }}
                        >
                            <SunIcon className="absolute flex-1 w-10 h-10 transition-all scale-100 rotate-0 -translate-y-1/2 dark:-rotate-90 dark:scale-0 top-1/2" />
                            <MoonIcon className="absolute flex-1 w-10 h-10 transition-all scale-0 rotate-90 -translate-y-1/2 top-1/2 dark:rotate-0 dark:scale-100" />
                            <p className="text-xl px-14 text-primaryGray">
                                {theme === "dark" ? "Dark mode" : "Light mode"}
                            </p>
                        </div>
                    </ul>
                </div>
                <div className="flex flex-col items-center gap-5 p-5 mt-10 text-xl text-center text-primaryGray">
                    {user?.name} ({user?.role}){" "}
                    <Button
                        className="w-full"
                        onClick={() => {
                            logout();
                            router.push("/login");
                        }}
                    >
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SlideBar;
