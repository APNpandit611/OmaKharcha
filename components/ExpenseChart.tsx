"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import { Transaction } from "@/lib/generated/prisma/client";

const COLORS = [
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
    "#06b6d4",
    "#84cc16",
];

const ExpenseChart = ({ data }: { data: Transaction[] }) => {
    const expenses = data.filter((t) => t.type === "expense");

    const categoryTotals = expenses.reduce((acc, transaction) => {
        acc[transaction.category] =
            (acc[transaction.category] || 0) + transaction.amount;
        return acc;
    }, {} as Record<string, number>);

    const chartsData = Object.entries(categoryTotals).map(([name, value]) => ({
        name,
        value,
    }));

    const now = new Date();
    const shortMonth = now.toLocaleDateString("en-US", { month: "short" });
    const year = now.getFullYear();


    return (
        <div className="w-full p-3">
            <Card className="group relative overflow-hidden backdrop-blur-xl bg-white/60 border border-white/40 shadow-lg hover:shadow-2xl transition-all duration-300">
                <CardHeader>
                    <CardTitle>Expenses by Category ({shortMonth} {year})</CardTitle>
                </CardHeader>
                <CardContent>
                    {chartsData.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">
                            No expense data to display
                        </p>
                    ) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={chartsData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) =>
                                        `${name}: ${(percent! * 100).toFixed(
                                            0
                                        )}%`
                                    }
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {chartsData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value: number) =>
                                        `$${value.toFixed(2)}`
                                    }
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ExpenseChart;
