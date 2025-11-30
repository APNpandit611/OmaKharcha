import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";

type BalanceInfoCardProps = {
    totalIncome: number;
    totalExpenses: number;
    balance: number;
};

const BalanceInfoCard = ({
    totalIncome,
    totalExpenses,
    balance,
}: BalanceInfoCardProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-gray-600">
                        Total Balance
                    </CardTitle>
                    <Wallet className="h-5 w-5 text-blue-600" />
                </CardHeader>
                <CardContent>
                    <div
                        className={`text-gray-900 ${
                            balance >= 0 ? "text-blue-600" : "text-red-600"
                        }`}
                    >
                        ${balance.toFixed(2)}
                    </div>
                    <p className="text-gray-500 mt-1">Current balance</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-gray-600">
                        Total Income
                    </CardTitle>
                    <ArrowUpCircle className="h-5 w-5 text-green-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-green-600">
                        ${totalIncome.toFixed(2)}
                    </div>
                    <p className="text-gray-500 mt-1">This month</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-gray-600">
                        Total Expenses
                    </CardTitle>
                    <ArrowDownCircle className="h-5 w-5 text-red-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-red-600">
                        ${totalExpenses.toFixed(2)}
                    </div>
                    <p className="text-gray-500 mt-1">This month</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default BalanceInfoCard;
