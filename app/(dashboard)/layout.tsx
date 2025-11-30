import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar";
import React from "react";

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen mx-auto max-w-7xl bg-primary-background font-sans">
            <Navbar />

            {children}
            {/* <ToastContainer position="bottom-right" theme="dark"/> */}
             <ToastContainer position="bottom-right" theme="dark" />
        </div>
    );
}
