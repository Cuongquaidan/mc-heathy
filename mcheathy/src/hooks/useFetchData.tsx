import { useState, useEffect } from "react";

const useFetchData = <T,>(
    url: string,
    errorMessage: string = "Fetch data failed",
    accessToken: string = " "
) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
    }, [url, errorMessage, accessToken]);

    return { data, loading, error };
};

export default useFetchData;
