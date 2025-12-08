"use server";
import { TransactionSchema } from "@/components/ExpenseForm";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";
import { Prisma } from "./generated/prisma/client";
import { startOfMonth, subMonths } from "date-fns";

const ITEM_PER_PAGE = 10;

export const createUser = async () => {
    try {
        const user = await currentUser();
        if (!user) return { success: false, error: true };

        const existingUser = await prisma.user.findUnique({
            where: {
                id: user?.id,
            },
        });
        if (!existingUser) {
            await prisma.user.create({
                data: {
                    id: user?.id,
                    name: `${user?.fullName ?? ""}`.trim(),
                    email: user?.emailAddresses[0]?.emailAddress ?? "",
                },
            });
            return { success: true, error: false };
        }
    } catch (error) {
        console.error("Failed to create error!", error);
    }
};

export const createTransaction = async (data: TransactionSchema) => {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not authenticated");

        const newData = await prisma.transaction.create({
            data: {
                userId: user?.id,
                type: data?.type,
                category: data?.category,
                amount: data?.amount,
                description: data?.description,
                date: new Date(data.date),
            },
        });

        return { newdata: newData, success: true, error: false };
    } catch (error) {
        console.error("failed to create transaction", error);
        return { success: true, error: false };
    }
};

export const getTransactions = async ({
    p,
    queryParams,
}: {
    p: number;
    queryParams?: { [key: string]: string | undefined };
}) => {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not authenticated!");

        const query: Prisma.TransactionWhereInput = {
            userId: user?.id,
        };
        if (queryParams) {
            for (const [key, value] of Object.entries(queryParams)) {
                if (value !== undefined) {
                    switch (key) {
                        case "search":
                            query.OR = [
                                {
                                    description: {
                                        contains: value,
                                        mode: "insensitive",
                                    },
                                },
                                {
                                    category: {
                                        contains: value,
                                        mode: "insensitive",
                                    },
                                },
                                {
                                    type: {
                                        contains: value,
                                        mode: "insensitive",
                                    },
                                },
                            ];
                            break;

                        default:
                            break;
                    }
                }
            }
        }
        const [data, count] = await prisma.$transaction([
            prisma.transaction.findMany({
                where: query,
                orderBy: {
                    updatedAt: "desc",
                },

                take: ITEM_PER_PAGE,
                skip: ITEM_PER_PAGE * (p - 1),
            }),

            prisma.transaction.count({
                where: query,
            }),
        ]);
        return { data: data, count: count, success: true, error: false };
    } catch (error) {
        console.error("failed to create transaction", error);
        return { success: true, error: false };
    }
};

export const getTransactionTotals = async () => {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not authenticated!");

        const thisMonthStart = startOfMonth(new Date());
        const lastMonthStart = startOfMonth(subMonths(new Date(), 1));
        const [totalIncome, totalExpense, lastMonthIncome, lastMonthExpense] =
            await prisma.$transaction([
                prisma.transaction.aggregate({
                    where: { userId: user.id, type: "income" },
                    _sum: { amount: true },
                }),

                prisma.transaction.aggregate({
                    where: { userId: user.id, type: "expense" },
                    _sum: { amount: true },
                }),

                prisma.transaction.aggregate({
                    where: {
                        userId: user.id,
                        type: "income",
                        date: {
                            gte: lastMonthStart,
                            lt: thisMonthStart,
                        },
                    },
                    _sum: { amount: true },
                }),

                prisma.transaction.aggregate({
                    where: {
                        userId: user.id,
                        type: "expense",
                        date: {
                            gte: lastMonthStart,
                            lt: thisMonthStart,
                        },
                    },
                    _sum: { amount: true },
                }),
            ]);

        const income = totalIncome._sum.amount ?? 0;
        const expense = totalExpense._sum.amount ?? 0;
        const lastIncome = lastMonthIncome._sum.amount ?? 0;
        const lastExpense = lastMonthExpense._sum.amount ?? 0;
        return { income, expense, lastIncome, lastExpense };
    } catch (error) {
        console.error("failed to create transaction", error);
        return { success: true, error: false };
    }
};

export const deleteTransaction = async (transactionId: string | undefined) => {
    try {
        const user = await currentUser();

        await prisma.transaction.delete({
            where: {
                userId: user?.id,
                id: transactionId,
            },
        });
        return { success: true, error: false };
    } catch (error) {
        console.error("failed to delete transaction", error);
        return { success: true, error: false };
    }
};
