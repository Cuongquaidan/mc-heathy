import React from "react";
import SliderBarItem from "./SliderBarItem";
import Home from "./icons/HomeIcon";
import PersonGroup from "./icons/PersonGroup";
import AddPerson from "./icons/AddPerson";
import { MdEditCalendar } from "react-icons/md";
interface MenuItem {
    name: string;
    url: string;
    icon: React.ReactNode;
}

function SlideBar() {
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
        <div className="min-h-screen p-5 border-r-2">
            <h1 className="text-5xl font-bold cursor-pointer">MCHeathy</h1>
            <ul className="flex flex-col items-start gap-8 mt-16">
                {menuItems.map((item) => (
                    <SliderBarItem
                        key={item.name}
                        name={item.name}
                        url={item.url}
                        icon={item.icon}
                    />
                ))}
            </ul>
        </div>
    );
}

export default SlideBar;
