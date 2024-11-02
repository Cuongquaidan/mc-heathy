"use client";
import { Doctor } from "@/lib/interface";
import DoctorItem from "./DoctorItem";
import useFetchData from "@/hooks/useFetchData";
import { useTokenStorage } from "@/store/store";
import { useRouter } from "next/navigation";

function DoctorsList() {
    const accessToken = useTokenStorage((state) => state.accessToken);
    const { data: doctors, error } = useFetchData<Doctor[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/doctors/getAll`,
        "Fetch data failed",
        accessToken || " "
    );
    const router = useRouter();
    if (!accessToken) {
        router.push("/login");
    }
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
                    isAdmin={true}
                ></DoctorItem>
            ))}
        </div>
    );
}

export default DoctorsList;
