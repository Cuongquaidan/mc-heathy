import { useTokenStorage } from "@/store/store";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const useFetchData = <T,>(
    url: string,
    errorMessage: string = "Fetch data failed",
    accessToken: string = " "
) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const renewAccessToken = useTokenStorage.getState().renewAccessToken;
    const logout = useTokenStorage.getState().logout;
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                });

                // Kiểm tra mã trạng thái
                // if (response.status === 401) {
                //     const result = await Swal.fire({
                //         title: "Hết giờ làm việc",
                //         text: "Phiên làm việc hết hạn, bạn có muốn mở rộng?",
                //         icon: "warning",
                //         showCancelButton: true,
                //         confirmButtonText: "Có",
                //         cancelButtonText: "Không",
                //     });

                //     if (result.isConfirmed) {
                //         await renewAccessToken();
                //     }

                //     return; // Trả về để không tiếp tục xử lý mã bên dưới
                // }

                if (!response.ok) throw new Error(errorMessage);
                const fetchedData: T = await response.json();
                setData(fetchedData);
            } catch (err) {
                setError(err instanceof Error ? err.message : String(err));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, errorMessage, accessToken, logout, renewAccessToken, router]);

    return { data, loading, error };
};

export default useFetchData;
