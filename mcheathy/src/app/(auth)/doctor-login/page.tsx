/* eslint-disable react/no-unescaped-entities */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useEffect } from "react";
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
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/doctors/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                }
            );

            const data = await response.json();

            if (data.message === "Login Successful...!") {
                const { accessToken, refreshToken } = data;
                login(accessToken, refreshToken);
                router.push("/doctor-home");
            }
            if (data.error === "Password does not match") {
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
        <div>
            <ToastContainer />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 max-w-screen w-[600px] border-textBlue border p-10 mx-auto mt-52 rounded-lg "
                >
                    <div>
                        <h2 className="py-2 text-3xl font-bold text-textBlue">
                            Login
                        </h2>
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
                </form>
            </Form>
        </div>
    );
}

export default LoginPage;
