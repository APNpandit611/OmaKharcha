"use client";

import { ScrollArea } from "@/components/ui/scroll-area"; // ✅ FIX 1
import { ArrowDownCircle, ArrowUpCircle, Loader2, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Transaction } from "@/lib/generated/prisma/client";
import { deleteTransaction } from "@/lib/actions";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import FormModal from "./FormModal";
import Link from "next/link";
import { Label } from "./ui/label";

const RecentTransactions = ({ data }: { data: Transaction[] }) => {
    // const router = useRouter();
    // const [loadingId, setLoadingId] = useState<string | null>(null);
    // const handleTransactionDelete = async (
    //     transactionId: string,
    //     transactionType: string
    // ) => {
    //     try {
    //         setLoadingId(transactionId);
    //         const res = await deleteTransaction(transactionId);
    //         if (res.success) {
    //             router.refresh();
    //             toast(`${transactionType} deleted successfully!`);
    //         }
    //     } catch (error) {
    //         console.error(`failed to delete ${transactionType}!`, error);
    //     } finally {
    //         setLoadingId(null);
    //     }
    // };
    // group relative backdrop-blur-xl bg-white/60 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300
    return (
        <div className="w-full p-3">
            <div className="h-[75vh] w-full rounded-lg group relative overflow-y-auto bg-white/60 border border-white/40 shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="p-6 flex flex-col gap-2 ">
                    <div className="flex items-start justify-between ">
                        <Label className="mb-4 text-md font-medium">
                            Recent Transactions
                        </Label>
                        <Link href="/transactions">
                            <button className="text-md text-slate-900 font-semibold cursor-pointer underline line-clamp-1">
                                See all
                            </button>
                        </Link>
                    </div>

                    <div className="p-0 rounded-lg flex flex-col gap-3">
                        {data.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">
                                No transactions yet
                            </p>
                        ) : (
                            data.map((transaction) => {
                                const formattedDate = new Date(transaction.date)
                                    .toISOString()
                                    .split("T")[0];

                                return (
                                    <div
                                        key={transaction.id}
                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            {transaction.type === "income" ? (
                                                <ArrowUpCircle className="h-5 w-5 text-green-600" />
                                            ) : (
                                                <ArrowDownCircle className="h-5 w-5 text-red-600" />
                                            )}

                                            <div className="flex-1 min-w-0">
                                                <p className="text-gray-900 truncate capitalize">
                                                    {transaction.description}
                                                </p>

                                                <div className="flex items-center gap-2 text-gray-500 flex-wrap">
                                                    <span className="truncate text-xs">
                                                        {transaction.category}
                                                    </span>
                                                    <span>•</span>
                                                    <span className="whitespace-nowrap text-xs ">
                                                        {formattedDate}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-5 ml-2">
                                            <span
                                                className={`whitespace-nowrap ${
                                                    transaction.type ===
                                                    "income"
                                                        ? "text-green-600"
                                                        : "text-red-600"
                                                }`}
                                            >
                                                {transaction.type === "income"
                                                    ? "+"
                                                    : "-"}
                                                ${transaction.amount.toFixed(2)}
                                            </span>

                                            {/* <Button
                                                variant="ghost"
                                                size="icon"
                                                // className="h-8 w-8 text-gray-400 hover:text-red-600 cursor-pointer"
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-red-100 to-red-200 text-red-500 border border-red-200/50 hover:text-color-800 cursor-pointer"
                                                onClick={() =>
                                                    handleTransactionDelete(
                                                        transaction.id,
                                                        transaction.type
                                                    )
                                                }
                                                disabled={loadingId === transaction.id}
                                            >
                                                {loadingId === transaction.id ? (
                                                    <Loader2 className="text-red-600 animate-spin"/>
                                                ) : (
                                                    <Trash2 className="h-5 w-5" />
                                                )}
                                            </Button> */}
                                            <FormModal
                                                action="delete"
                                                id={transaction.id}
                                            />
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentTransactions;
