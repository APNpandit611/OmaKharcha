import { cn } from "@/lib/utils";
import {
    ArrowDownRight,
    ArrowUpRight,
    TrendingDown,
    TrendingUp,
    Wallet,
} from "lucide-react";

type BalanceInfoCardProps = {
    totalIncome: number;
    totalExpenses: number;
    balance: number;
    lastIncome: number;
    lastExpense: number;
};

const BalanceInfoCard = ({
    totalIncome,
    totalExpenses,
    balance,
    lastExpense,
    lastIncome,
}: BalanceInfoCardProps) => {
    // savings rate calculation
    const prevMonthSavings = lastIncome - lastExpense;
    const currMonthSavings = totalIncome - totalExpenses;
    const savingDifference = currMonthSavings - prevMonthSavings; // -24,6
    const savingsRate =
        prevMonthSavings === 0
            ? 0
            : (savingDifference / prevMonthSavings) * 100;
    const isSavingUp = savingDifference >= 0;

    // income difference calculation
    const differenceIncome = totalIncome - lastIncome;
    const PreviousIncome =
        lastIncome === 0 ? 0 : (differenceIncome / lastIncome) * 100;
    const isUp = differenceIncome >= 0;

    // expense difference calculation
    const differenceExpense = totalExpenses - lastExpense;
    const previousExpense =
        lastExpense === 0 ? 0 : (differenceExpense / lastExpense) * 100;
    const isExpenseUp = differenceExpense >= 0;


    // date calculations
    const now = new Date();
    const prevMonthDate = new Date(now);
    prevMonthDate.setMonth(now.getMonth() - 1);
    const prevMonthDateShort = prevMonthDate.toLocaleString("default", {
        month: "short",
    });
    const currMonthDateShort = now.toLocaleString("default", {
        month: "short",
    });
    const prevYear = prevMonthDate.getFullYear();
    const currYear = now.getFullYear();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-3">
            {/* <Card>
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
            </Card> */}

            {/* Total Balance */}
            <div className="group relative overflow-hidden backdrop-blur-xl bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 bg-white/10"></div>
                <div className="relative z-10 ">
                    <div className="flex items-center justify-between mb-8">
                        <Wallet className="h-8 w-8 text-white/80" />
                        <div className="bg-white/20 rounded-full p-2">
                            <TrendingUp className="h-4 w-4 text-white" />
                        </div>
                    </div>
                    <p className="text-white/80 mb-1">Total Balance</p>
                    <h2 className="text-white font-semibold">
                        €{balance.toFixed(2)}
                    </h2>
                </div>
            </div>

            {/* <Card>
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
            </Card> */}

            {/* Total Income */}
            <div className="group relative overflow-hidden backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                    <div className="bg-green-100 rounded-full p-3">
                        <ArrowUpRight className="h-5 w-5 text-green-600" />
                    </div>
                    {/* <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full">
                        {lastIncome} %
                    </span> */}

                    <span
                        className={cn(
                            "px-2 py-1 rounded-full",
                            isUp
                                ? "text-green-600 bg-green-100"
                                : "text-red-600 bg-red-100"
                        )}
                    >
                        {isUp ? "+" : ""}
                        {PreviousIncome.toFixed(1)} %
                    </span>
                </div>
                <p className="text-gray-600 mb-1">
                    Total Income (
                    <span className="text-xs">
                        {currMonthDateShort} {currYear}
                    </span>
                    )
                </p>
                <h2 className="text-green-600 text-lg font-semibold">
                    €{totalIncome.toFixed(2)}
                </h2>
                <p className="text-gray-400 mt-2 text-xs">
                    €{lastIncome.toFixed(2)} ({prevMonthDateShort} {prevYear})
                </p>
            </div>

            {/* <Card>
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
            </Card> */}

            {/* Total Expenses */}
            <div className="group relative overflow-hidden backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                    <div className="bg-red-100 rounded-full p-3">
                        <ArrowDownRight className="h-5 w-5 text-red-600" />
                    </div>
                    <span
                        className={cn(
                            "px-2 py-1 rounded-full",
                            isExpenseUp
                                ? "text-green-600 bg-green-100"
                                : "text-red-600 bg-red-100"
                        )}
                    >
                        {isExpenseUp ? "+" : ""}
                        {previousExpense.toFixed(1)} %
                    </span>
                </div>
                <p className="text-gray-600 mb-1">
                    Total Expense (
                    <span className="text-xs">
                        {currMonthDateShort} {currYear}
                    </span>
                    )
                </p>
                <h2 className="text-red-600 text-lg font-semibold">
                    €{totalExpenses.toFixed(2)}
                </h2>
                <p className="text-gray-400 mt-2 text-xs">
                    €{lastExpense.toFixed(2)} ({prevMonthDateShort} {prevYear})
                </p>
            </div>

            {/* Savings Rate */}
            <div className="group relative overflow-hidden backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                    <div
                        className={cn(
                            "rounded-full p-3",
                            isSavingUp ? "bg-emerald-100" : "bg-orange-100"
                        )}
                    >
                        {isSavingUp ? (
                            <TrendingUp className="h-5 w-5 text-emerald-600" />
                        ) : (
                            <TrendingDown className="h-5 w-5 text-orange-600" />
                        )}
                    </div>

                    <span className="text-purple-600 bg-purple-100 px-2 py-1 rounded-full text-sm font-medium">
                        {savingsRate.toFixed(2)} %
                    </span>
                </div>
                <p className="text-gray-600 mb-1">
                    Savings Rate (
                    <span className="text-xs">
                        {currMonthDateShort} {currYear}
                    </span>
                    )
                </p>

                <h2
                    className={cn(
                        "text-lg font-semibold",
                        isSavingUp ? "text-emerald-600" : "text-red-600"
                    )}
                >
                    €{currMonthSavings.toFixed(2)}
                </h2>

                <p className="text-gray-400 mt-2 text-xs">
                    €{prevMonthSavings.toFixed(2)} ({prevMonthDateShort}{" "}
                    {prevYear})
                </p>
            </div>
        </div>
    );
};

export default BalanceInfoCard;
