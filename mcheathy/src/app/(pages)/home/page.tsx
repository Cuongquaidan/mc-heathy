import React from "react";
import { Metadata } from "next";
import Banner from "@/components/Banner";
export const metadata: Metadata = {
    title: "Home",
    description:
        "McHeathy is a comprehensive healthcare platform designed to offer fast, safe, and reliable health protection services. Our mission is to prioritize your well-being by providing easy access to healthcare professionals and services. With McHeathy, you can quickly book appointments with qualified doctors, schedule health consultations, and manage your medical needs with ease.Our platform is built to ensure the highest level of safety and privacy for users, enabling you to find the right care at the right time. Whether you're seeking preventative care, specialist consultations, or regular check-ups, McHeathy is here to make your healthcare experience seamless, secure, and efficient ",
};
function Home() {
    return (
        <div>
            <Banner></Banner>
        </div>
    );
}

export default Home;
