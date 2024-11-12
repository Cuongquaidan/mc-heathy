import TableDoctorHome from "@/components/appointments/TableDoctorHome";
import React from "react";

function DoctorHomePage() {
    return (
        <div className="p-4">
            <h2 className="px-10 text-3xl font-bold">
                Your appointment in next 3 days
            </h2>
            <TableDoctorHome></TableDoctorHome>
        </div>
    );
}

export default DoctorHomePage;
