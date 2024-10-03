"use client";
import { Doctor } from "@/lib/interface";
import DoctorItem from "./DoctorItem";
import useFetchData from "@/hooks/useFetchData";

function DoctorsList() {
    const { data: doctors, error } = useFetchData<Doctor[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/doctors/getAll`
    );
    if (error) return <div>{error}</div>;
    return (
        <div className="flex flex-wrap gap-10 p-10">
            {doctors?.map((item, index) => (
                <DoctorItem
                    isFlex={false}
                    width="200px"
                    height="250px"
                    item={item}
                    key={index}
                ></DoctorItem>
            ))}
        </div>
    );
}

export default DoctorsList;
