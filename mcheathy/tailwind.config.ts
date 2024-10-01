import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primaryGray: "#595f69",
                lightBlue: "#eaf4fe",
                textBlue: "#1590ff",
                darkBackground: "#09090b",
                darkTextSecondary: "#7d7c81",
                darkTextPrimary: "#fafafa",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            backgroundImage: {
                "light-gradient":
                    "linear-gradient(180deg, #AFC1DC 0%, #E2E5ED 100%)",
                "dark-gradient":
                    "linear-gradient(180deg, #09090b 0%, #09090b 100%)",
            },
        },
    },
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    plugins: [require("tailwindcss-animate")],
};
export default config;
