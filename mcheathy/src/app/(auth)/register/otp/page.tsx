"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useUnresgisterStore } from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
function OTPPage() {
    const router = useRouter();
    const email = useUnresgisterStore((state) => state.email);
    const name = useUnresgisterStore((state) => state.name);
    const password = useUnresgisterStore((state) => state.password);
    const gender = useUnresgisterStore((state) => state.gender);
    const dob = useUnresgisterStore((state) => state.dob);
    const phone = useUnresgisterStore((state) => state.phone);
    const avatar = useUnresgisterStore((state) => state.avatar);
    const [otpInput, setOtpInput] = useState<string>("");
    const handleVerify = async () => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/register/verify-otp/${otpInput}`
        );
        if (!response) throw new Error("Verify otp failed");
        const data = await response.json();
        return data;
    };
    const handleSendOTP = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/register/otp`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, name }),
                }
            );
            const data = await response.json();
            if (data.message === "Email is already in use") {
                router.push(
                    `/register?error=${encodeURIComponent(data.message)}`
                );
            } else {
                throw new Error(data.message || "Send OTP failed");
            }
            if (!response) throw new Error("Send otp failed");
        } catch (error) {
            console.log(error);
        }
    };
    const register = async () => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    name,
                    password,
                    dob,
                    phone,
                    avatar,
                    gender,
                    role: "user",
                }),
            }
        );
        if (!response) throw new Error("Register failed");
        const data = await response.json();
        if (data.message === "User created successfully")
            router.push(`/login?message=${encodeURIComponent(data.message)}`);
    };
    useEffect(() => {
        handleSendOTP();
    }, [email]);
    if (!email)
        return (
            <div>
                <p>Please fill register form</p>
                <Link href="/register">Register here</Link>
            </div>
        );

    return (
        <div className="w-[1000px] max-w-[100%] mx-auto flex-col flex gap-5 py-16 items-center min-h-screen">
            <p className="mb-10 text-3xl font-bold">Verify OTP</p>
            <Input
                placeholder="Enter your OTP"
                className="w-[400px] p-6 text-2xl"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
            ></Input>
            <div className="flex gap-10">
                <Button
                    className="p-6 hover:bg-green-300 bg-green-600 min-w-[150px] text-black text-lg"
                    onClick={async () => {
                        const verified = await handleVerify();
                        if (verified.msg === "Verify Successsfully!") {
                            await register();
                        }
                    }}
                >
                    Verify OTP
                </Button>
                <Button
                    className="p-6 hover:bg-yellow-300 min-w-[150px] text-lg text-black bg-yellow-500"
                    onClick={() => handleSendOTP()}
                >
                    Resend OTP
                </Button>
                <Button className="p-6 hover:bg-red-300 min-w-[150px] text-lg text-black bg-red-500">
                    Cancel
                </Button>
            </div>
        </div>
    );
}

export default OTPPage;
