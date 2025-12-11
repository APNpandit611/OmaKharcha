"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

// type Procedure = (...args: any[]) => void;

// const debounce = <F extends Procedure>(
//   fn: F,
//   delay: number
// ): ((...args: Parameters<F>) => void) => {
//   let timer: ReturnType<typeof setTimeout>;

//   return (...args: Parameters<F>) => {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       fn(...args);
//     }, delay);
//   };
// };

const TableSearch = () => {
    const router = useRouter();

    const handleSubmit = useDebouncedCallback((value: string) => {
        // e.preventDefault();
        // const value = (e.currentTarget as HTMLInputElement).value;
        // const value = e.currentTarget.value;
        const params = new URLSearchParams(window.location.search);
        params.set("search", value);
        router.push(`${window.location.pathname}?${params}`);
    }, 500);

    return (
        <div className="w-full md:w-[50%] flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
            {/* SEARCH BAR */}

            <Search width={16} height={16} className="text-gray-400" />
            <input
                onChange={(e) => handleSubmit(e.currentTarget.value)}
                placeholder="Search transactions..."
                type="text"
                className="w-[200px] p-2 bg-transparent rounded-md text-small outline-none"
            />
        </div>
    );
};

export default TableSearch;
