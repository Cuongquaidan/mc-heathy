import TableAppointmentsDoctor from "@/components/appointments/TableAppointmentsDoctor";
import React from "react";

function DoctorAppointmentPage() {
    return (
        <div className="p-4">
            <h2 className="px-10 text-3xl font-bold">Your appointment</h2>
            <TableAppointmentsDoctor></TableAppointmentsDoctor>
        </div>
    );
}

export default DoctorAppointmentPage;
