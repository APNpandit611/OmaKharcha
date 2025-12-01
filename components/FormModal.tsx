"use client";
import { Loader2, Plus, PlusCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { JSX, useState } from "react";
import { Button } from "./ui/button";
import ExpenseForm from "./ExpenseForm";
import { Transaction } from "@/lib/generated/prisma/browser";
import { deleteTransaction } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// const Transaction = dynamic(() => import("./TransactionForm"), {
//     loading: () => <Spinner />,
// });

// const forms: {
//     [key: string]: (
//         setOpen?: React.Dispatch<React.SetStateAction<boolean>>,
//         action: "create" | "update",
//         transactions?: Transaction,
//         id?: string | undefined
//     ) => JSX.Element;
// } = {
//     transact: (action) => (
//         <div>
//             create or update
//         </div>
//     ),
// };

const Form = ({
    id,
    action,
    data,
    setOpen,
}: {
    id?: string | undefined;
    action: "create" | "update" | "delete";
    data?: Transaction;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [loading, setLoading] = useState<boolean | null>(false);
    const router = useRouter();

    const handleDelete = async () => {
        try {
            setLoading(true);
            const res = await deleteTransaction(id);
            if (res.success) {
router.refresh();
toast(`Transaction deleted successfully!`);
                
                
            }
        } catch (error) {
            console.error(`failed to delete transaction!`, error);
        } finally {
            setLoading(false);
        }
    };

    if (action === "create" || action === "update") {
        return (
            <ExpenseForm
                id={id}
                data={data}
                action={action}
                setOpen={setOpen}
            />
        );
    }

    if (action === "delete" && id) {
        return (
            <form className=" p-4 flex flex-col gap-4 items-center justify-center">
                <span className="text-center font-medium">
                    All the data will be lost. Are you sure you want to delete
                    this transaction?
                </span>
                <Button
                    variant="destructive"
                    className="bg-red-500 text-white hover:bg-red-600 w-fit cursor-pointer"
                    onClick={handleDelete}
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Deleting...
                        </>
                    ) : (
                        "Delete"
                    )}
                </Button>
            </form>
        );
    }

    return <div className="p-4">Form not found</div>;
};

const FormModal = ({
    action,
    data,
    id,
}: {
    action: "create" | "update" | "delete";
    data?: Transaction;
    id?: string | undefined;
}) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {action === "delete" ? (
                <Button
                    onClick={() => setOpen(true)}
                    variant="ghost"
                    size="icon"
                    // className="h-8 w-8 text-gray-400 hover:text-red-600 cursor-pointer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-red-100 to-red-200 text-red-500 border border-red-200/50 hover:text-color-800 cursor-pointer"
                >
                    <Trash2 className="h-5 w-5" />
                </Button>
            ) : (
                <button
                    onClick={() => setOpen(true)}
                    className="p-1.5 text-white bg-gray-900 rounded-lg px-5 cursor-pointer flex items-center justify-center gap-1"
                >
                    <Plus className="w-4 h-4" /> Add
                </button>
            )}

            {open && (
                <div className="w-screen h-screen fixed inset-0 bg-black/60 dark:bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center">
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-md relative w-[90%] nd:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%]">
                        <Form
                            action={action}
                            setOpen={setOpen}
                            id={id}
                            data={data}
                        />
                        <div
                            className="absolute top-3 right-3 cursor-pointer"
                            onClick={() => setOpen(false)}
                        >
                            <Image
                                src="/close.png"
                                alt=""
                                width={14}
                                height={14}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FormModal;
