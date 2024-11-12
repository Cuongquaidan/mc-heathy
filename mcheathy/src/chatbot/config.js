import Options from "@/components/chatbot/Options";
import { createChatBotMessage } from "react-chatbot-kit";

const config = {
    initialMessages: [
        createChatBotMessage(`Hello, I am PickPen, type "help" for more`),
    ],
    widgets: [
        {
            widgetName: "options",
            widgetFunc: (props) => <Options {...props} />,
            props: {
                options: ["Book Appointment", "Speciality"], // Add desired options here
            },
            mapStateToProps: [],
        },
    ],
};

export default config;
