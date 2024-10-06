import CalendarBook from "@/components/appointments/CalendarBook";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
    title: "Book Appointment",
    description:
        "McHeathy is a comprehensive healthcare platform designed to offer fast, safe, and reliable health protection services. Our mission is to prioritize your well-being by providing easy access to healthcare professionals and services. With McHeathy, you can quickly book appointments with qualified doctors, schedule health consultations, and manage your medical needs with ease.Our platform is built to ensure the highest level of safety and privacy for users, enabling you to find the right care at the right time. Whether you're seeking preventative care, specialist consultations, or regular check-ups, McHeathy is here to make your healthcare experience seamless, secure, and efficient ",
};
function BookAppointmentPage() {
    return (
        <div className="w-[1400px] max-w-screen mx-auto py-28">
            <CalendarBook doctorId="66f8921ee78fe6c36f346cd3"></CalendarBook>
        </div>
    );
}

export default BookAppointmentPage;
