"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { MdOutlineCancel } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useFetchData from "@/hooks/useFetchData";
import { Appointment } from "@/lib/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useTokenStorage } from "@/store/store";
import { useRouter } from "next/navigation";
import { Pagination } from "antd";
import type { PaginationProps } from "antd";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
const formSchema = z.object({
    search: z.string().min(0, {
        message: "Please type search text",
    }),
});

function TableAppointments() {
    const accessToken = useTokenStorage((state) => state.accessToken);
    const [page, setPage] = useState(1);
    const [patientPhone, setPatientPhone] = useState("");
    const [limit, setLimit] = useState(10);
    const [appointmentsList, setAppointmentsList] = useState<
        Appointment[] | undefined
    >(undefined);
    const [total, setTotal] = useState(0);

    const { data, error } = useFetchData<{
        appointmentsList: Appointment[];
        total: number;
    }>(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments/get?&patientPhone=${patientPhone}&page=${page}&limit=${limit}`,
        "Fetch data failed",
        accessToken || " "
    );
    useEffect(() => {
        setAppointmentsList(data?.appointmentsList);
        setTotal(data?.total ?? 0);
    }, [data?.appointmentsList, data?.total]);
    const router = useRouter();
    if (!accessToken) {
        router.push("/login");
    }
    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/appointments/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log("Deleted appointment:", data);
                window.location.reload();
            } else {
                const errorData = await response.json();
                console.error("Error deleting appointment:", errorData.error);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const onChange: PaginationProps["onChange"] = (pageNumber) => {
        setLimit(10);
        setPage(pageNumber);
    };
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: "",
        },
    });
    function onSubmit(values: z.infer<typeof formSchema>) {
        setPatientPhone(values.search);
    }
    if (error) return <div>{error}</div>;
    return (
        <div className="p-10">
            <div className="p-5">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex gap-10 mx-auto w-[1000px] max-w-[100%] pb-10"
                    >
                        <div className="flex-1">
                            <FormField
                                control={form.control}
                                name="search"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="Type patient phone"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit">Search</Button>
                    </form>
                </Form>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Patient phone</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Doctor phone</TableHead>
                        <TableHead>Fees</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Delete</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {appointmentsList?.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage src={item.userAvatar} />
                                    <AvatarFallback>
                                        {item.userName}
                                    </AvatarFallback>
                                </Avatar>
                                {item.userName}
                            </TableCell>
                            <TableCell>{item.userPhone}</TableCell>
                            <TableCell className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage src={item.doctorAvatar} />
                                    <AvatarFallback>
                                        {item.doctorName}
                                    </AvatarFallback>
                                </Avatar>
                                {item.doctorName}
                            </TableCell>
                            <TableCell>{item.doctorPhone}</TableCell>
                            <TableCell>{item.fees}</TableCell>
                            <TableCell>
                                {new Date(item.dateTime).toLocaleString(
                                    "en-US",
                                    {
                                        timeZone: "UTC",
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                        hour: "numeric",
                                        minute: "numeric",
                                        hour12: true,
                                    }
                                )}
                            </TableCell>
                            <TableCell>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <MdOutlineCancel
                                            size={40}
                                            className="p-1 text-red-600 rounded-full"
                                        />
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                You want to delete this
                                                appointment, are you sure?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone.
                                                This appointment will be
                                                permanently deleted and cannot
                                                be recovered.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() =>
                                                    handleDelete(item._id)
                                                }
                                            >
                                                Continue
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex justify-center w-full mt-5">
                {total > (page - 1) * 20 + 10 && (
                    <div>
                        {limit === 20 ? (
                            <Button
                                onClick={() => {
                                    setLimit(10);
                                }}
                                className="font-bold text-red-700 bg-red-300 hover:bg-red-200 hover:scale-95 dark:text-red-700 dark:bg-red-300 dark:hover:bg-red-200 dark:hover:scale-95"
                            >
                                Hide
                            </Button>
                        ) : (
                            <Button
                                onClick={() => setLimit(20)}
                                className="font-bold text-green-700 bg-green-300 hover:bg-green-200 hover:scale-110 dark:text-green-700 dark:bg-green-300 dark:hover:bg-green-200 dark:hover:scale-110"
                            >
                                Show more
                            </Button>
                        )}
                    </div>
                )}
            </div>
            <Pagination
                defaultCurrent={1}
                total={total}
                onChange={onChange}
                pageSize={20}
                className="flex items-center justify-center w-full p-3 mx-auto mt-5 font-bold "
            />
        </div>
    );
}

export default TableAppointments;
