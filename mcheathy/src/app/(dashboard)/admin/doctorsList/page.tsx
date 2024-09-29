import DoctorsList from "@/components/doctor/DoctorsList";
import React from "react";

function DoctorsPage() {
    return (
        <div className="p-5">
            <h1 className="text-3xl font-semibold">All Doctors</h1>
            <DoctorsList></DoctorsList>
        </div>
    );
}

export default DoctorsPage;
