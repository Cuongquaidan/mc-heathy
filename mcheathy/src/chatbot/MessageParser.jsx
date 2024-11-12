/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

const MessageParser = ({ children, actions }) => {
    const parse = (message) => {
        if (message.toLowerCase().includes("hello")) {
            actions.handleHello();
        } else if (message.toLowerCase().includes("help")) {
            actions.handleChoose();
        } else if (message.toLowerCase().includes("book appointment")) {
            actions.handleBook();
        } else if (message.toLowerCase().includes("speciality")) {
            actions.handleSpeciality();
        }
    };

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    parse: parse,
                    actions: {},
                });
            })}
        </div>
    );
};

export default MessageParser;
