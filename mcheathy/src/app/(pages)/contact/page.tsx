import React from "react";
import { Metadata } from "next";
import ContactImage from "@/public/assets/images/contact_image.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
export const metadata: Metadata = {
    title: "Contact",
    description:
        "McHeathy is a comprehensive healthcare platform designed to offer fast, safe, and reliable health protection services. Our mission is to prioritize your well-being by providing easy access to healthcare professionals and services. With McHeathy, you can quickly book appointments with qualified doctors, schedule health consultations, and manage your medical needs with ease.Our platform is built to ensure the highest level of safety and privacy for users, enabling you to find the right care at the right time. Whether you're seeking preventative care, specialist consultations, or regular check-ups, McHeathy is here to make your healthcare experience seamless, secure, and efficient ",
};
function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen max-w-screen  w-[900px] mx-auto items-center">
            <h2 className="flex gap-2 text-3xl font-bold text-primaryGray">
                CONTACT{" "}
                <p className="text-black dark:text-darkTextPrimary"> US</p>
            </h2>
            <div className="flex gap-10 mt-10">
                <Image
                    src={ContactImage}
                    alt="MCHeathy"
                    width={400}
                    height={400}
                    className="dark:brightness-75"
                ></Image>
                <div className="flex flex-col justify-between p-5 text-primaryGray">
                    <p className="text-xl font-bold dark:text-darkTextPrimary text-primaryGray">
                        OUR OFFICE
                    </p>
                    <div>
                        <div>
                            <p>54709 Willms Station</p>
                            <p>Suite 350, Washington, USA</p>
                        </div>
                        <div>
                            <p>Tel: (415) 555‑0132</p>
                            <p>Email: hamanhcuong18112004@gmail.com</p>
                        </div>
                    </div>
                    <p className="text-xl font-bold dark:text-darkTextPrimary text-primaryGray">
                        CAREERS AT PRESCRIPTO
                    </p>
                    <p>Learn more about our teams and job openings.</p>
                    <Button
                        variant={"outline"}
                        className="w-32 dark:text-darkTextPrimary text-primaryGray"
                    >
                        Explore Jobs
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;
