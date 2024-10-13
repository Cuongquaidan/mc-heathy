"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useUnresgisterStore } from "@/store/store";
import Link from "next/link";
function OTPPage() {
    const email = useUnresgisterStore((state) => state.email);
    const name = useUnresgisterStore((state) => state.name);
    const [otpInput, setOtpInput] = useState<string>("");
    const handleVerify = async () => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/register/verify-otp/${otpInput}`
        );
        if (!response) throw new Error("Verify otp failed");
    };
    useEffect(() => {
        const handleSendOTP = async () => {
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
            if (!response) throw new Error("Send otp failed");
        };
        handleSendOTP();
    }, [email, name]);
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
                    onClick={() => handleVerify()}
                >
                    Verify OTP
                </Button>
                <Button className="p-6 hover:bg-yellow-300 min-w-[150px] text-lg text-black bg-yellow-500">
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
