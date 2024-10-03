import React from "react";
import DatePickerOfFind from "./DatePickerOfFind";

function FindByDate() {
    return (
        <div className="flex flex-col items-center mx-auto mt-40">
            <p className="text-2xl font-bold ">
                Find available doctors by date
            </p>
            <p className="text-primaryGray">
                Search for available doctors by date and book your appointment
                conveniently.
            </p>
            <div className="w-full mt-5">
                <DatePickerOfFind></DatePickerOfFind>
            </div>
        </div>
    );
}

export default FindByDate;
