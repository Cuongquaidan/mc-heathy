import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";

import { AuthorizeUserRoute } from "@/middleware/auth";
import React, { ReactNode } from "react";

function PageLayout({ children }: { children: ReactNode }) {
    return (
        <AuthorizeUserRoute>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <Header></Header>
                {children}
                <Footer></Footer>
            </ThemeProvider>
        </AuthorizeUserRoute>
    );
}

export default PageLayout;
