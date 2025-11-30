"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Loader2 } from "lucide-react";
import InputField from "./InputField";
import { Button } from "./ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Transaction } from "@/lib/generated/prisma/client";
import { Label } from "./ui/label";
// import { prisma } from "@/lib/prisma";
import { createTransaction } from "@/lib/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const EXPENSE_CATEGORIES = [
    "Food & Dining",
    "Shopping",
    "Transportation",
    "Entertainment",
    "Bills & Utilities",
    "Healthcare",
    "Education",
    "Travel",
    "Other",
];

const INCOME_CATEGORIES = [
    "Salary",
    "Freelance",
    "Business",
    "Investments",
    "Gifts",
    "Other",
];

const schema = z.object({
    type: z.string().min(1, { message: "Type is required!" }),
    category: z.string().min(1, { message: "Category is required!" }),
    amount: z.coerce
        .number({ message: "Amount must be a number." })
        .positive({ message: "Amount must be greater than 0!" }),
    description: z.string().min(1, { message: "Description is required!" }),
    date: z.string().min(1, { message: "Date is required!" }),
});

export type TransactionSchema = z.infer<typeof schema>;
const ExpenseForm = ({
    action,
    data,
    setOpen,
    id,
}: {
    action: "create" | "update";
    data?: Transaction;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id?: string | undefined;
}) => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            type: data?.type || "expense",
            amount: data?.amount || 0,
            category: data?.category || "",
            description: data?.description || "",
            date: data?.date
                ? new Date(data.date).toISOString().split("T")[0]
                : new Date().toISOString().split("T")[0],
        },
    });

    const currentType = watch("type");
    const router = useRouter();

    const onSubmit = async (data: TransactionSchema) => {
        try {
            setLoading(true);
            const res = await createTransaction(data);
            if (res.success) {
                setOpen(false);
                router.refresh();
                setLoading(false);
                toast("Transaction created successfully!");
            }
            else {
                toast("Failed to create transaction!")
            }
        } catch (error) {
            console.log(error);
            toast("Server Error 500");
        }
    };

    return (
        <form
            className="flex flex-col gap-8 w-full"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h1 className="text-xl font-semibold capitalize">
                {action} Transaction
            </h1>
            <div className="flex flex-col gap-7 md:flex-row md:justify-between w-full">
                <div className="flex flex-col gap-7 w-full">
                    <div className="flex flex-col gap-3 w-full">
                        <Label className="font-md">Type</Label>
                        <div className="grid grid-cols-2 gap-2">
                            <Button
                                type="button"
                                variant={
                                    currentType === "expense"
                                        ? "default"
                                        : "outline"
                                }
                                onClick={() => setValue("type", "expense")}
                                className="w-full"
                            >
                                Expense
                            </Button>
                            <Button
                                type="button"
                                variant={
                                    currentType === "income"
                                        ? "default"
                                        : "outline"
                                }
                                onClick={() => setValue("type", "income")}
                                className="w-full"
                            >
                                Income
                            </Button>
                        </div>
                        {errors.type && (
                            <p className="text-xs text-red-400">
                                {errors.type.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                            value={watch("category")}
                            onValueChange={(val) => setValue("category", val)}
                            required
                        >
                            <SelectTrigger id="category" className="w-full">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {(currentType === "income"
                                    ? INCOME_CATEGORIES
                                    : EXPENSE_CATEGORIES
                                ).map((cat) => (
                                    <SelectItem key={cat} value={cat}>
                                        {cat}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.category && (
                            <p className="text-xs text-red-400">
                                {errors.category.message}
                            </p>
                        )}
                    </div>

                    <InputField
                        label="Amount"
                        formType="number"
                        register={register}
                        name="amount"
                        error={errors.amount}
                        inputProps={{ step: "0.01", inputMode: "decimal" }}
                    />
                    <InputField
                        label="Description"
                        formType="text"
                        register={register}
                        name="description"
                        error={errors.description}
                    />
                    <InputField
                        label="Date"
                        formType="date"
                        register={register}
                        name="date"
                        error={errors.date}
                    />

                    <div className="flex items-end justify-end w-full">
                        <button
                            type="submit"
                            className="w-full p-2 bg-pie-blue text-white rounded-md cursor-pointer"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <Loader2 className="animate-spin" />
                                    <span>
                                        {action === "create"
                                            ? "Creating..."
                                            : "Updating..."}
                                    </span>
                                </div>
                            ) : action === "create" ? (
                                "Create"
                            ) : (
                                "Update"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ExpenseForm;
