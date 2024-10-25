"use client";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Button } from "../ui/button";
import useFetchData from "@/hooks/useFetchData";
import { Appointment, Doctor } from "@/lib/interface";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import avatarDefault from "@/public/assets/images/avatar.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useTokenStorage } from "@/store/store";
function CalendarBook() {
    const paramsSearch = useSearchParams();
    const doctorId = paramsSearch.get("doctorId");
    console.log(doctorId);
    const accessToken = useTokenStorage((state) => state.accessToken);

    const { data: doctor, error: errorDoctor } = useFetchData<Doctor>(
        `${process.env.NEXT_PUBLIC_API_URL}/doctors/getDoctorById?doctorId=${doctorId}`,
        "Fetch data failed",
        accessToken || ""
    );

    console.log(doctor);
    const { data: appointmentsList, error } = useFetchData<Appointment[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments/getByDoctorId?doctorId=${doctorId}`,
        "Fetch data failed",
        accessToken || ""
    );

    const user = {
        _id: "66fbea2425920a2268563f55",
        name: "Nguyễn Văn Đạn",
        avatar: "https://images.pexels.com/photos/27782182/pexels-photo-27782182/free-photo-of-th-i-trang-dan-ong-d-ng-ph-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        email: "nguyenvandan@gmail.com",
        dob: new Date("1999-10-01T17:00:00.000+00:00"),
        phone: "077722112",
        gender: true,
    };

    const router = useRouter();
    const unavailableDay =
        appointmentsList?.map((item) => new Date(item.dateTime)) || [];

    type ValuePiece = Date | null;
    type Value = ValuePiece | [ValuePiece, ValuePiece];

    const [value, onChange] = useState<Value>(new Date());

    const isUnavailable = (date: Date) => {
        return unavailableDay.some(
            (unavailable) =>
                unavailable.getFullYear() === date.getFullYear() &&
                unavailable.getMonth() === date.getMonth() &&
                unavailable.getDate() === date.getDate()
        );
    };
    const handleBook = async () => {
        const appointmentValue = {
            userId: user._id,
            dateTime: value,
            userAvatar: user.avatar,
            userPhone: user.phone,
            doctorId: doctor?._id,
            doctorName: doctor?.name,
            userName: user.name,
            doctorAvatar: doctor?.avatar,
            doctorPhone: doctor?.phone,
            fees: doctor?.fees,
        };
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/appointments/addAppointment`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(appointmentValue),
            }
        );
        if (!response.ok) {
            toast.error("Book Appointment Failed");
        } else {
            toast.success(
                "Book Appointment Successfully and redirect to Home Page",
                {
                    autoClose: 2000,
                }
            );
            setTimeout(() => {
                router.push("/home");
            }, 2000);
        }
    };
    if (error || errorDoctor)
        return <div>{"doctor:" + errorDoctor || "Date:" + error}</div>;
    if (!accessToken) {
        router.push("/login");
    }
    return (
        <div className="flex gap-10">
            <ToastContainer />
            <div className="flex flex-col items-center gap-5">
                <Image
                    src={doctor?.avatar || avatarDefault}
                    alt={doctor?.name || "Doctor name"}
                    width={100}
                    height={100}
                    className="w-[300px] h-[400px]"
                ></Image>
                <p className="text-2xl font-bold">{doctor?.name}</p>
                <p className="text-xl font-bold text-green-500">
                    Fees: {doctor?.fees}
                </p>
            </div>
            <div className="flex-1">
                <Calendar
                    onChange={onChange}
                    locale="en-US"
                    value={value}
                    tileClassName={({ date }) =>
                        ` ${isUnavailable(date) ? "unavailable-day" : ""}`
                    }
                />
                <div className="flex items-center gap-20 mt-8">
                    <p className="text-xl font-semibold ">
                        Ngày được chọn:{" "}
                        {value instanceof Date ? value.toDateString() : ""}
                    </p>
                    <Button
                        className="bg-textBlue hover:bg-blue-400"
                        onClick={handleBook}
                    >
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CalendarBook;
