/* eslint-disable react/no-unescaped-entities */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { useTokenStorage } from "@/store/store";

const formSchema = z.object({
    email: z.string().email({ message: "Must be a valid email" }),
    password: z.string(),
});

function LoginPage() {
    const { login } = useTokenStorage();
    const searchParams = useSearchParams();
    const message = searchParams.get("message");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                }
            );

            const data = await response.json();
            console.log("Response data:", data);
            setIsLoading(false);

            if (data.message === "Login Successful...!") {
                const { accessToken, refreshToken } = data;
                login(accessToken, refreshToken);
                router.push("/home");
            }
            console.log("Data:", data.error);
            if (data.error) {
                toast.error(data.error, {
                    autoClose: 2000,
                });
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    }

    useEffect(() => {
        if (message) {
            toast.success(message, {
                autoClose: 2000,
            });
        }
    }, [message]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
        >
            <ToastContainer></ToastContainer>

            {
                isLoading ? (
                    <div className="space-y-8 max-w-screen w-[600px] border-textBlue min-h-[500px] border p-10 mx-auto mt-52 rounded-lg flex items-center justify-center">
                        <div className="animate-spin border-4 border-gray-700 w-10 h-10 border-t-transparent rounded-full"></div>
                    </div>
                ) : (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8 max-w-screen w-[600px] min-h-[500px] border-textBlue border p-10 mx-auto mt-52 rounded-lg "
                        >
                            <div>
                                <h2 className="py-2 text-3xl font-bold text-textBlue">
                                    Login
                                </h2>
                                <p>Please login to book an appointment</p>
                            </div>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Your email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Your password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="text-xl font-bold bg-lightBlue text-textBlue hover:bg-blue-200"
                            >
                                Submit
                            </Button>
                            <div className="flex gap-2">
                                <p>You haven't an account? </p>
                                <Link href={"/register"} className="text-textBlue ">
                                    Register here
                                </Link>
                            </div>
                        </form>
                    </Form>
                )
            }
        </motion.div>
    );
}

export default LoginPage;
