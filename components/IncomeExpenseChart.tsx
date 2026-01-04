"use client";

import { Transaction } from "@/lib/generated/prisma/client";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { Label } from "./ui/label";

const shortMonth = new Date().toLocaleDateString("en-US", { month: "short" });
const year = new Date().getFullYear();

// Helper function to format a date string for display
const formatDateForDisplay = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });

export function IncomeExpenseChart({ data }: { data: Transaction[] }) {
    // 1. Group all transactions by their date
    // We'll use a plain object for simplicity
    const totalsByDate: {
        [date: string]: { income: number; expense: number };
    } = {};

    data.forEach((transaction) => {
        // FIX: Convert the Date object to a string key (e.g., "2023-10-27")
        const dateKey = transaction.date.toISOString().split("T")[0];

        // If we haven't seen this date before, create a default entry
        if (!totalsByDate[dateKey]) {
            totalsByDate[dateKey] = { income: 0, expense: 0 };
        }

        // Add the amount to the correct category (income or expense)
        if (transaction.type === "income") {
            totalsByDate[dateKey].income += transaction.amount;
        } else {
            totalsByDate[dateKey].expense += transaction.amount;
        }
    });

    // 2. Convert the grouped data into the format the chart needs
    const chartData = Object.entries(totalsByDate)
        // 3. Sort the data and take the last 10 entries
        .sort(([a], [b]) => a.localeCompare(b)) 
        .map(([date, values]) => ({
            date: formatDateForDisplay(date), // The nice, short date for display
            Income: values.income,
            Expenses: values.expense,
        }))
        // .sort((a, b) => a.date.localeCompare(b.date))
        // .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // ...by the original key if you kept it. This is more robust.
        .slice(-32);

    return (
        <div className="w-full p-3">
            <div className=" rounded-2xl p-6 group relative overflow-hidden backdrop-blur-xl bg-white/60 border border-white/40 shadow-lg hover:shadow-2xl transition-all duration-300">
                <Label className="text-gray-900 text-md mb-4">
                    Spending Trends ({shortMonth} {year})
                </Label>

                {chartData.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                        No spending trends data to display
                    </p>
                ) : (
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient
                                    id="colorIncome"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#10b981"
                                        stopOpacity={0.3}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#10b981"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                                <linearGradient
                                    id="colorExpense"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#ef4444"
                                        stopOpacity={0.3}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#ef4444"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e5e7eb"
                            />
                            <XAxis dataKey="date" stroke="#6b7280" />
                            <YAxis stroke="#6b7280" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                                    border: "none",
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                }}
                            />
                            <Legend />
                            <Area
                                type="monotone"
                                dataKey="Income"
                                stroke="#10b981"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorIncome)"
                            />
                            <Area
                                type="monotone"
                                dataKey="Expenses"
                                stroke="#ef4444"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorExpense)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}
