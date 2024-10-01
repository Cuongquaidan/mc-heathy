import TableAppointments from "@/components/appointments/TableAppointments";
import React from "react";

function AppointmentsPages() {
    return (
        <div className="p-5">
            <h2 className="text-3xl font-bold">All Appointment</h2>
            <TableAppointments></TableAppointments>
        </div>
    );
}

export default AppointmentsPages;