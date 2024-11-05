"use client";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { useTokenStorage } from "@/store/store";
import useFetchData from "@/hooks/useFetchData";
import { Doctor, Speciality } from "@/lib/interface";

export default function Component() {
    const colors: string[] = [
        "#FF5733",
        "#33FF57",
        "#3357FF",
        "#FF33A1",
        "#33FFF5",
        "#FF8633",
        "#A133FF",
        "#33FF8A",
        "#FFC733",
        "#33A1FF",
    ];
    const accessToken = useTokenStorage((state) => state.accessToken);
    const { data: doctors } = useFetchData<Doctor[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/doctors/getAll`,
        "Fetch data failed",
        accessToken || " "
    );
    const { data: specialitys } = useFetchData<Speciality[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/specialitys/getAll`,
        "Fetch data failed",
        accessToken || " "
    );

    const countDoctorOfSpeciality = (speciality: string): number => {
        return (
            doctors?.filter((item) => item.speciality === speciality).length ||
            0
        );
    };
    interface ChartDataItem {
        speciality: string;
        doctors: number;
        fill: string;
    }

    const chartData: ChartDataItem[] = [];
    specialitys?.forEach((item, index) => {
        chartData.push({
            speciality: item.name,
            doctors: countDoctorOfSpeciality(item.name),
            fill: index < colors.length ? colors[index] : colors[length - 1],
        });
    });
    const chartConfig = {
        doctors: {
            label: "Doctors",
        },
    } satisfies ChartConfig;
    specialitys?.forEach((item) => {
        Object.assign(chartConfig, {
            [item.name]: {
                label: item.name,
            },
        });
    });
    console.log(chartConfig);

    return (
        <Card className="w-[70%] mx-auto mt-10">
            <CardHeader>
                <CardTitle>Bar Chart - Mixed</CardTitle>
                <CardDescription>
                    Number of doctors in speciality
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            left: 60,
                        }}
                    >
                        <YAxis
                            dataKey="speciality"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) =>
                                chartConfig[value as keyof typeof chartConfig]
                                    ?.label
                            }
                        />
                        <XAxis dataKey="doctors" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="doctors" layout="vertical" radius={5} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
