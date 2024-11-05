/* eslint-disable react/no-unescaped-entities */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
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
import convertToBase64 from "@/helpers/convertbase64";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSearchParams } from "next/navigation";

function ProfilePage() {
    const [file, setFile] = useState<string>();

    const searchParams = useSearchParams();
    const error = searchParams.get("error");
    const formSchema = z.object({
        name: z.string().min(2).max(50),
        avatar: z.string(),
        dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid date format",
        }),
        phone: z
            .string()
            .regex(
                /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                {
                    message: "Phone number is invalid",
                }
            ),
        gender: z.string(),
    });

    const handleAvatarChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const base64 = (await convertToBase64(files[0])) as string;
            setFile(base64);
        }
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            gender: "Male",
            avatar: "",
            name: "",
            phone: "",
            dob: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const formValues = {
            ...values,
            dob: new Date(values.dob),
            avatar: file,
            gender: values.gender === "Male" ? true : false,
        };

        if (
            formValues.name &&
            formValues.avatar &&
            formValues.dob &&
            formValues.phone &&
            formValues.gender
        ) {
            console.log(formValues);
        } else {
            toast.error("Please fill out the form correctly!", {
                autoClose: 2000,
            });
        }
    }
    useEffect(() => {
        if (error) {
            toast.error(error, {
                autoClose: 2000,
            });
        }
    }, [error]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="p-40 mx-auto space-y-8 rounded-lg "
            >
                <ToastContainer />

                <div className="flex justify-center">
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
                                                cursor: "pointer",
                                                borderWidth: 4,
                                                borderColor: "lightblue",
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
                </div>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Your name" {...field} />
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
                                <Input placeholder="Doctor phone" {...field} />
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
                    name="gender"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Gender</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    defaultValue="option-one"
                                    onValueChange={field.onChange}
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="Male"
                                            id="Male"
                                        />
                                        <Label htmlFor="Male">Male</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="Female"
                                            id="Female"
                                        />
                                        <Label htmlFor="Female">Female</Label>
                                    </div>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="text-xl font-bold bg-lightBlue text-textBlue "
                >
                    Update profile
                </Button>
            </form>
        </Form>
    );
}

export default ProfilePage;
