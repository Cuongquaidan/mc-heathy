import React from "react";
import { Metadata } from "next";
import AboutImage from "@/public/assets/images/about_image.png";
import Image from "next/image";
export const metadata: Metadata = {
    title: "About",
    description:
        "McHeathy is a comprehensive healthcare platform designed to offer fast, safe, and reliable health protection services. Our mission is to prioritize your well-being by providing easy access to healthcare professionals and services. With McHeathy, you can quickly book appointments with qualified doctors, schedule health consultations, and manage your medical needs with ease.Our platform is built to ensure the highest level of safety and privacy for users, enabling you to find the right care at the right time. Whether you're seeking preventative care, specialist consultations, or regular check-ups, McHeathy is here to make your healthcare experience seamless, secure, and efficient ",
};

function AboutPage() {
    return (
        <div className="max-w-[100%] w-[1400px] mx-auto flex flex-col items-center py-10 min-h-screen">
            <h2 className="flex gap-2 text-3xl font-bold text-primaryGray">
                ABOUT{" "}
                <p className="text-black dark:text-darkTextPrimary"> US</p>
            </h2>
            <div className="flex gap-10 mt-10">
                <Image
                    src={AboutImage}
                    alt="MCHeathy"
                    width={400}
                    height={400}
                    className="dark:brightness-75"
                ></Image>
                <div className="flex flex-col justify-between p-5 text-primaryGray">
                    <p>
                        Welcome to Prescripto, your trusted partner in managing
                        your healthcare needs conveniently and efficiently. At
                        Prescripto, we understand the challenges individuals
                        face when it comes to scheduling doctor appointments and
                        managing their health records.
                    </p>
                    <p>
                        Prescripto is committed to excellence in healthcare
                        technology. We continuously strive to enhance our
                        platform, integrating the latest advancements to improve
                        user experience and deliver superior service. Whether
                        you are booking your first appointment or managing
                        ongoing care, Prescripto is here to support you every
                        step of the way
                    </p>
                    <p className="text-2xl font-bold text-black dark:text-darkTextPrimary">
                        Our Vision
                    </p>
                    <p>
                        Our vision at Prescripto is to create a seamless
                        healthcare experience for every user. We aim to bridge
                        the gap between patients and healthcare providers,
                        making it easier for you to access the care you need,
                        when you need it.
                    </p>
                </div>
            </div>
            <div className="w-full mt-20">
                <h3 className="flex gap-2 text-2xl font-bold text-primaryGray">
                    WHY{" "}
                    <p className="text-black dark:text-darkTextPrimary">
                        {" "}
                        CHOOSE US
                    </p>
                </h3>
                <div className="grid grid-cols-3 mt-10 ">
                    <div className="p-10 border border-primaryGray">
                        <h4 className="text-2xl font-bold">Convenience:</h4>
                        <div className="flex flex-col gap-5 mt-10 text-primaryGray">
                            <p>Streamlined appointment scheduling</p>
                            <p>That fits into your busy lifestyle.</p>
                        </div>
                    </div>
                    <div className="p-10 border border-primaryGray border-x-0">
                        <h4 className="text-2xl font-bold">Efficiency:</h4>
                        <div className="flex flex-col gap-5 mt-10 text-primaryGray">
                            <p>Access to a network of trusted</p>
                            <p>healthcare professionals in your area.</p>
                        </div>
                    </div>
                    <div className="p-10 border border-primaryGray ">
                        <h4 className="text-2xl font-bold">Personalization:</h4>
                        <div className="flex flex-col gap-5 mt-10 text-primaryGray">
                            <p>Tailored recommendations and reminders</p>
                            <p>To help you stay on top of your health.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;
