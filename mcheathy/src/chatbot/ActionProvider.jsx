import React from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ActionProvider = ({ createChatBotMessage, setState, children }) => {
    const handleHello = () => {
        const botMessage = createChatBotMessage("Hello. Nice to meet you.");

        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };
    const handleChoose = () => {
        const botMessage = createChatBotMessage(
            "What can i help you (Write 1 option exactly)",
            {
                widget: "options",
            }
        );

        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };
    const handleBook = () => {
        const botMessage = createChatBotMessage(
            "Step 1: Choose a doctor Step 2: Select a schedule Step 3: Confirm the appointment"
        );

        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };
    const handleSpeciality = () => {
        const botMessage = createChatBotMessage(
            "We have General physician, Gynecologist, Dermatologist, Pediatricians, Neurologist and Gastroenterologist"
        );

        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };
    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    actions: {
                        handleHello,
                        handleChoose,
                        handleBook,
                        handleSpeciality,
                    },
                });
            })}
        </div>
    );
};

export default ActionProvider;
