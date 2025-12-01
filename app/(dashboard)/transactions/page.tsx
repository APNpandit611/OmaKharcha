import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import TableSearch from "@/components/TableSearch";
import { getTransactions } from "@/lib/actions";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

const TransactionPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
    const user = await currentUser();

    const { page, ...queryParams } = await searchParams;
    const p = page ? parseInt(page) : 1;
    const transactions = await getTransactions({ p, queryParams });
    
    return (
        <div className="bg-gray-50 h-screen w-full p-3">
            <section className="h-[85vh] max-w-7xl mx-auto w-full rounded-lg border overflow-hidden bg-white">
                <div className="p-6 flex flex-col gap-2">
                    <div className="flex flex-col items-start justify-between md:flex-row ">
                        <span className="mb-4 text-lg font-medium ">
                            Recent Transactions
                        </span>
                        <TableSearch/>
                    </div>

                    <div className="py-3 rounded-lg flex flex-col gap-3">
                        {!user || transactions.count === 0 ? (
                            <p className="text-gray-500 text-center py-8">
                                No transactions yet
                            </p>
                        ) : (
                            transactions?.data?.map((transaction) => {
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
                                                    <span className="truncate text-sm">
                                                        {transaction.category}
                                                    </span>
                                                    <span>•</span>
                                                    <span className="whitespace-nowrap text-sm">
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
            </section>
                <Pagination page={p} count={transactions.count}/>
        </div>
    );
};

export default TransactionPage;
