import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"], // choose weights you need
  display: "swap",
});
export const metadata: Metadata = {
    title: "OmaKharcha",
    description: "Expense Tracking Application",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <body className={roboto.className}>{children}</body>
            </html>
        </ClerkProvider>
    );
}
