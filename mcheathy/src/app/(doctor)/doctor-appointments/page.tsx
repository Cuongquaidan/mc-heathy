import TableAppointmentsDoctor from "@/components/appointments/TableAppointmentsDoctor";
import ChatListDoctor from "@/components/chat/ChatListDoctor";

import { ChatProvider } from "@/context/ChatContext";
import React from "react";

function DoctorAppointmentPage() {
    return (
        <ChatProvider>
            <div className="p-4">
                <h2 className="px-10 text-3xl font-bold">Your appointment</h2>
                <TableAppointmentsDoctor></TableAppointmentsDoctor>
            </div>
            <ChatListDoctor></ChatListDoctor>
        </ChatProvider>
    );
}

export default DoctorAppointmentPage;
