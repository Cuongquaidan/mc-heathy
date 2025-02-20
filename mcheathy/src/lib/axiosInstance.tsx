"use client";
import { useTokenStorage } from "@/store/store";
import axios from "axios";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { 'Content-Type': 'application/json' }
});


const AxiosInterceptor = ({ children }: { children: React.ReactNode }) => {
    const accessToken = useTokenStorage((state) => state.accessToken);

    useEffect(() => {
        // Thêm request interceptor
        const requestInterceptor = axiosInstance.interceptors.request.use((config) => {
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        });

        // Thêm response interceptor
        const responseInterceptor = axiosInstance.interceptors.response.use(
            (response) => response, // Trả về response bình thường
            (error) => {
                if (error.response) {
                    const { status } = error.response;
                    if (status === 401) {
                        toast.error("Authentication failed");
                    } else if (status === 500) {
                        toast.error("Server error");
                    } else if (status === 404) {
                        toast.error("Not found");
                    } else if (status === 400) {
                        toast.error("Bad request");
                    } else if (status === 403) {
                        toast.error("Forbidden");
                    } else if (status === 405) {
                        toast.error("Method not allowed");
                    }
                }
                return Promise.reject(error); // Trả lỗi về để xử lý tiếp
            }
        );

        // Cleanup: Xóa interceptor khi component bị unmount
        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
            axiosInstance.interceptors.response.eject(responseInterceptor);
        };
    }, [accessToken]);

    return <>{children}</>;
};

export default axiosInstance;
export { AxiosInterceptor };
