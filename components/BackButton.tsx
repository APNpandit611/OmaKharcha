"use client";
import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = () => {
    const router = useRouter();
    return (
        <ArrowBigLeft
            className="cursor-pointer hover:fill-gray-500"
            onClick={() => router.back()}
        />
    );
};

export default BackButton;
