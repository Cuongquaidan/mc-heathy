"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import convertToBase64 from "@/helpers/convertbase64";
import Image from "next/image";

function AddDoctor() {
    const { toast } = useToast();
    const [file, setFile] = useState<string>();
    const formSchema = z.object({
        name: z.string().min(2).max(50),
        avatar: z.string(),
        dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid date format",
        }),
        speciality: z.string(),
        email: z.string().email({ message: "Must be a valid email" }),
        password: z.string().min(6),
        phone: z
            .string()
            .regex(
                /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                {
                    message: "Phone number is invalid",
                }
            ),
        address: z.string().min(1, { message: "Address is required" }),
        fees: z.coerce
            .number()
            .min(0, { message: "Fees must be a positive number" }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            avatar: "",
            dob: new Date().toISOString(),
            speciality: "",
            email: "",
            password: "",
            phone: "",
            address: "",
            fees: 0,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const formValues = {
            ...values,
            dob: new Date(values.dob).toISOString(),
            avatar: file,
            fees: parseFloat(values.fees.toString()),
        };

        console.log(formValues);
        if (
            formValues.name &&
            formValues.avatar &&
            formValues.dob &&
            formValues.speciality &&
            formValues.email &&
            formValues.password &&
            formValues.phone &&
            formValues.address &&
            formValues.fees
        ) {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/doctors/addDoctor`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formValues),
                }
            );
            if (!response.ok) {
                toast({
                    title: "Add failed",
                    description: "",
                    duration: 2000,
                    style: { backgroundColor: "red", color: "white" },
                });
            } else {
                toast({
                    title: "Successfully",
                    description: "",
                    duration: 2000,
                    style: { backgroundColor: "green", color: "white" },
                });
                form.reset();
                setFile(undefined);
            }
        } else {
            toast({
                title: "Form not fill",
                description: "Fill out the form",
                duration: 2000,
                style: { backgroundColor: "red", color: "white" },
            });
        }
    }

    // Function to handle avatar file change
    const handleAvatarChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = e.target.files; // Lấy các tập tin từ input
        if (files && files.length > 0) {
            const base64 = (await convertToBase64(files[0])) as string; // Chuyển đổi tập tin sang base64
            setFile(base64); // Cập nhật trạng thái file
        }
    };

    return (
        <div className="flex flex-col p-10 ">
            <Toaster />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-[full] items-center flex flex-col"
                >
                    <FormField
                        control={form.control}
                        name="avatar"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    {file ? (
                                        <Image
                                            src={file}
                                            width={100}
                                            height={100}
                                            alt="avatar"
                                            style={{
                                                borderRadius: "50%",
                                                objectFit: "cover",
                                                width: "200px",
                                                height: "200px",
                                            }}
                                        />
                                    ) : (
                                        <div className="flex items-center gap-5">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-10 h-10"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                            <p className="text-md ">
                                                Choose your avatar
                                            </p>
                                        </div>
                                    )}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        style={{ display: "none" }}
                                        type="file"
                                        accept="image/*"
                                        {...field}
                                        onChange={(e) => {
                                            handleAvatarChange(e);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid w-full grid-cols-2 gap-10 p-20 ">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem style={{ width: "100%" }}>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Doctor name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem style={{ width: "100%" }}>
                                    <FormLabel>Doctor email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Doctor email"
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
                                <FormItem style={{ width: "100%" }}>
                                    <FormLabel>Doctor password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Doctor password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem style={{ width: "100%" }}>
                                    <FormLabel>Doctor phone</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Doctor phone"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem style={{ width: "100%" }}>
                                    <FormLabel>Doctor address</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Doctor address"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="fees"
                            render={({ field }) => (
                                <FormItem style={{ width: "100%" }}>
                                    <FormLabel>Doctor fees</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Doctor fees"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dob"
                            render={({ field }) => (
                                <FormItem style={{ width: "100%" }}>
                                    <FormLabel>DOB</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Your birthday"
                                            type="date"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="speciality"
                            render={({ field }) => (
                                <FormItem style={{ width: "100%" }}>
                                    <FormLabel>Speciality</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue=""
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select speciality" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Dermatologist">
                                                Dermatologist
                                            </SelectItem>
                                            <SelectItem value="Pediatricians">
                                                Pediatricians
                                            </SelectItem>
                                            <SelectItem value="Neurologist">
                                                Neurologist
                                            </SelectItem>
                                            <SelectItem value="Gastroenterologist">
                                                Gastroenterologist
                                            </SelectItem>
                                            <SelectItem value="Gynecologist">
                                                Gynecologist
                                            </SelectItem>
                                            <SelectItem value="General physician">
                                                General physician
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button
                        style={{
                            width: "100%",
                            height: "40px",
                        }}
                        type="submit"
                    >
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default AddDoctor;
