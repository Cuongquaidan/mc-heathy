import NumberOfDoctors from "@/components/doctor/numberOfDoctors";
import NumberOfSpecialitys from "@/components/speciality/numberOfSpecialitys";
import React from "react";

function AdminPage() {
    return (
        <div className="p-10">
            <NumberOfDoctors></NumberOfDoctors>

            <NumberOfSpecialitys></NumberOfSpecialitys>
        </div>
    );
}

export default AdminPage;
