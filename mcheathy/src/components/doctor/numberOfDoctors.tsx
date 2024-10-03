"use client";
import useFetchData from "@/hooks/useFetchData";
import { Doctor } from "@/lib/interface";

function NumberOfDoctors() {
    const { data: doctors, error } = useFetchData<Doctor[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/doctors/getAll`
    );
    if (error) return <div>{error}</div>;
    return (
        <div className="flex items-center justify-between gap-5 px-10 py-4 text-4xl font-bold border border-teal-500">
            Number of Doctors:
            <div className="flex items-center justify-center w-20 h-20 p-3 text-center border rounded-full bg-lightBlue border-textBlue text-textBlue">
                {doctors?.length}
            </div>
        </div>
    );
}

export default NumberOfDoctors;
