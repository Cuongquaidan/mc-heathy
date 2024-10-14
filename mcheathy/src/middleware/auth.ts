/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ReactNode, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useTokenStorage } from "@/store/store";

interface ProtectAdminRouteProps {
    children: ReactNode;
}

export const ProtectAdminRoute: React.FC<ProtectAdminRouteProps> = ({
    children,
}) => {
    const router = useRouter();
    const accessToken = useTokenStorage.getState().accessToken;
    console.log(accessToken);
    // Thay đổi state để kiểm tra người dùng có hợp lệ hay không
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        if (!accessToken) {
            // Nếu không có accessToken, điều hướng đến /home
            router.push("/home");
            setIsAuthorized(false);
        } else {
            try {
                const user = jwtDecode<any>(accessToken); // Giải mã token để lấy thông tin người dùng
                console.log(user);
                if (user.role !== "admin") {
                    router.push("/home");
                    setIsAuthorized(false);
                } else {
                    setIsAuthorized(true);
                }
            } catch (error) {
                console.error("Error decoding token", error);
                router.push("/home");
                setIsAuthorized(false);
            }
        }
    }, [accessToken, router]);

    // Chờ cho đến khi xác thực hoàn tất
    if (isAuthorized === null) {
        return null; // Có thể trả về một loading spinner tại đây
    }

    // Render children nếu người dùng có quyền admin
    if (isAuthorized) return children;
};
