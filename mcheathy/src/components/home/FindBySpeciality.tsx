import React from "react";
import GeneralPhysician from "@/public/assets/images/GeneralPhysician.png";
import Dermatologist from "@/public/assets/images/Dermatologist.png";
import Gastroenterologist from "@/public/assets/images/Gastroenterologist.png";
import Gynecologist from "@/public/assets/images/Gynecologist.png";
import Neurologist from "@/public/assets/images/Neurologist.png";
import Pediatricians from "@/public/assets/images/Pediatricians.png";
import SpecialityItem from "../speciality/SpecialityItem";
function FindBySpeciality() {
    return (
        <div className="flex flex-col items-center mx-auto mt-20">
            <p className="text-2xl font-bold ">Find by Speciality </p>
            <p className="text-primaryGray">
                Simply browse through our extensive list of trusted doctors,
                schedule your appointment hassle-free.
            </p>
            <div className="flex gap-10 mt-20">
                <SpecialityItem
                    src={GeneralPhysician}
                    name="General physician"
                ></SpecialityItem>
                <SpecialityItem
                    src={Dermatologist}
                    name="Dermatologist"
                ></SpecialityItem>
                <SpecialityItem
                    src={Pediatricians}
                    name="Pediatricians"
                ></SpecialityItem>
                <SpecialityItem
                    src={Gastroenterologist}
                    name="Gastroenterologist"
                ></SpecialityItem>
                <SpecialityItem
                    src={Gynecologist}
                    name="Gynecologist"
                ></SpecialityItem>
                <SpecialityItem
                    src={Neurologist}
                    name="Neurologist"
                ></SpecialityItem>
            </div>
        </div>
    );
}

export default FindBySpeciality;
