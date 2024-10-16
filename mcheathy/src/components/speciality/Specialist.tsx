"use client";
import useFetchData from "@/hooks/useFetchData";
import { Doctor, Speciality } from "@/lib/interface";
import React, { useState } from "react";
import { Button } from "../ui/button";
import DoctorListCustom from "../doctor/DoctorListCustom";
import { useTokenStorage } from "@/store/store";

function Specialist() {
    const accessToken = useTokenStorage((state) => state.accessToken);
    const [speciality, setSpeciality] = useState<string>("");
    const { data: specialist, error: errorSpe } = useFetchData<Speciality[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/specialitys/getAll`
    );
    const { data: doctors, error } = useFetchData<Doctor[]>(
        `${
            process.env.NEXT_PUBLIC_API_URL
        }/doctors/getDoctorsBySpeciality?speciality=${encodeURIComponent(
            speciality
        )}`,
        "Fetch data failed",
        accessToken || " "
    );
    if (errorSpe) return <div>{errorSpe}</div>;
    if (error) return <div>{error}</div>;
    return (
        <div className="grid grid-cols-[1fr,4fr] gap-20 mt-10">
            <div className="flex flex-col gap-5">
                {specialist?.map((item, index) => (
                    <div key={index}>
                        <Button
                            variant={"outline"}
                            className={`w-full hover:bg-blue-300 hover:border-none border-primaryGray h-12 text-md ${
                                item.name == speciality
                                    ? "bg-blue-300 border-none dark:bg-gray-700"
                                    : ""
                            }`}
                            onClick={() => {
                                if (item.name != speciality) {
                                    setSpeciality(item.name);
                                } else {
                                    setSpeciality("");
                                }
                            }}
                        >
                            {item.name}
                        </Button>
                    </div>
                ))}
            </div>
            <div>
                {doctors && (
                    <DoctorListCustom data={doctors}></DoctorListCustom>
                )}
            </div>
        </div>
    );
}

export default Specialist;
