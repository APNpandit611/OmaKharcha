"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const TableSearch = () => {
    const router = useRouter();

    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        // e.preventDefault();
        const value = (e.currentTarget as HTMLInputElement).value;
        const params = new URLSearchParams(window.location.search);
        params.set("search", value);
        router.push(`${window.location.pathname}?${params}`);
    };

    return (
        <div className="w-full md:w-[50%] flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
            {/* SEARCH BAR */}

            <Search width={16} height={16} className="text-gray-400" />
            <input
                onChange={handleSubmit}
                placeholder="Search transactions..."
                type="text"
                className="w-[200px] p-2 bg-transparent rounded-md text-small outline-none"
            />
        </div>
    );
};

export default TableSearch;
