import NumberOfDoctors from "@/components/doctor/numberOfDoctors";
import NumberOfSpecialitys from "@/components/speciality/numberOfSpecialitys";
import ChartMixedSpecielWithDoctor from "@/components/chart/ChartMixedSpecielWithDoctor";
import React from "react";

function AdminPage() {
    return (
        <div className="p-10">
            <NumberOfDoctors></NumberOfDoctors>

            <NumberOfSpecialitys></NumberOfSpecialitys>
            <ChartMixedSpecielWithDoctor></ChartMixedSpecielWithDoctor>
        </div>
    );
}

export default AdminPage;
