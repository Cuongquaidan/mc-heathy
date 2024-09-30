import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import React, { ReactNode } from "react";

function PageLayout({ children }: { children: ReactNode }) {
    return (
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
    );
}

export default PageLayout;
