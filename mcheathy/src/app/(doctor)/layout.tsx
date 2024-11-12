import Footer from "@/components/Footer";
import HeaderDoctor from "@/components/HeaderDoctor";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthorizeUserRoute } from "@/middleware/auth";
import React from "react";

function DoctorLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthorizeUserRoute>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <HeaderDoctor></HeaderDoctor>
                {children}
                <Footer></Footer>
            </ThemeProvider>
        </AuthorizeUserRoute>
    );
}

export default DoctorLayout;
