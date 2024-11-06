"use client";
import convertToBase64 from "@/helpers/convertbase64";
import { useTokenStorage } from "@/store/store";
import Image from "next/image";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
function AddTopic() {
    const accessToken = useTokenStorage((state) => state.accessToken);

    const [file, setFile] = useState<string>();
    const formSchema = z.object({
        title: z.string().min(2).max(50),
        thumb: z.string(),
        content: z.string(),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            thumb: "",
            content: "",
        },
    });
    const handleAvatarChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = e.target.files; // Lấy các tập tin từ input
        if (files && files.length > 0) {
            const base64 = (await convertToBase64(files[0])) as string; // Chuyển đổi tập tin sang base64
            setFile(base64); // Cập nhật trạng thái file
        }
    };
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const formValues = {
            ...values,

            thumb: file,
        };

        console.log(formValues);
        if (formValues.title && formValues.thumb && formValues.content) {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/topics/addTopic`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify(formValues),
                }
            );
            const result = await response.json();
            if (!response.ok) {
                toast.error(result.message || "Failed");
            } else {
                toast.success("Successfully!!!!");
                form.reset();
                setFile(undefined);
            }
            console.log(formValues);
        } else {
            toast.error("Form not fill");
        }
    }
    return (
        <div>
            <ToastContainer></ToastContainer>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-[full] items-center flex flex-col"
                >
                    <FormField
                        control={form.control}
                        name="thumb"
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
                                                objectFit: "cover",
                                                width: "800px",
                                                height: "400px",
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
                                                Choose your thumb
                                            </p>
                                            <input
                                                type="file"
                                                name="thumb"
                                                id="thumb"
                                                className="hidden"
                                                onChange={(e) => {
                                                    handleAvatarChange(e);
                                                }}
                                            />
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

                    <div className="grid w-full grid-cols-1 gap-10 p-20 ">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem style={{ width: "100%" }}>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem style={{ width: "100%" }}>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        <ReactQuill theme="snow" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button
                        style={{
                            width: "100px",
                            height: "40px",
                        }}
                        className="mx-auto"
                        type="submit"
                    >
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default AddTopic;
