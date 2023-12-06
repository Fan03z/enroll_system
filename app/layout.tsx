import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import ToasterContext from "@/context/ToasterContext";
import { RegisterContextProvider } from "@/context/RegisterContext";

export const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});
export const metadata: Metadata = {
    title: "Enroll System",
    description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
                <RegisterContextProvider>
                    <ToasterContext />
                    {children}
                </RegisterContextProvider>
            </body>
        </html>
    );
}
