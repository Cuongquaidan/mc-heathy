import TableAppointmentsUser from "@/components/appointments/TableAppointmentsUser";
import ChatList from "@/components/chat/ChatList";
import { ChatProvider } from "@/context/ChatContext";
import React from "react";

function MyAppointmentsPage() {
    return (
        <ChatProvider>
            <div>
                <TableAppointmentsUser></TableAppointmentsUser>
                <ChatList></ChatList>
            </div>
        </ChatProvider>
    );
}

export default MyAppointmentsPage;
