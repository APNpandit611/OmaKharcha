import {
    ArrowDownCircle,
    ArrowDownRight,
    ArrowUpCircle,
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
    const savingsRate =
        totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : "0";

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
            <div className="group relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 bg-white/10"></div>
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                        <Wallet className="h-8 w-8 text-white/80" />
                        <div className="bg-white/20 rounded-full p-2">
                            <TrendingUp className="h-4 w-4 text-white" />
                        </div>
                    </div>
                    <p className="text-white/80 mb-1">Total Balance</p>
                    <h2 className="text-white">${balance.toFixed(2)}</h2>
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
                    <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full">
                        {lastIncome} %
                    </span>
                </div>
                <p className="text-gray-600 mb-1">Total Income</p>
                <h2 className="text-green-600">${totalIncome.toFixed(2)}</h2>
                <p className="text-gray-500 mt-2 text-sm">This month</p>
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
                    <span className="text-red-600 bg-red-100 px-2 py-1 rounded-full">
                        {lastExpense} %
                    </span>
                </div>
                <p className="text-gray-600 mb-1">Total Expenses</p>
                <h2 className="text-red-600">${totalExpenses.toFixed(2)}</h2>
                <p className="text-gray-500 mt-2 text-sm">This month</p>
            </div>

            {/* Savings Rate */}
            <div className="group relative overflow-hidden backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                    <div className="bg-purple-100 rounded-full p-3">
                        <TrendingDown className="h-5 w-5 text-purple-600" />
                    </div>
                    <span className="text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                        {savingsRate} %
                    </span>
                </div>
                <p className="text-gray-600 mb-1">Savings Rate</p>
                <h2 className="text-gray-900">{savingsRate}%</h2>
                <p className="text-gray-500 mt-2">Of income saved</p>
            </div>
        </div>
    );
};

export default BalanceInfoCard;
