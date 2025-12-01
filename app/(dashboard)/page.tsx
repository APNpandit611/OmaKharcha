import BalanceInfoCard from "@/components/BalanceInfoCard";
import ExpenseChart from "@/components/ExpenseChart";
import { IncomeExpenseChart } from "@/components/IncomeExpenseChart";
import RecentTransactions from "@/components/RecentTransactions";
import { createUser, getTransactions } from "@/lib/actions";
import { currentUser } from "@clerk/nextjs/server";
import { startOfMonth, subMonths, isAfter, isBefore } from "date-fns";

//     id: string;
//     type: "income" | "expense";
//     amount: number;
//     category: string;
//     description: string;
//     date: string;
// };

// const INITIAL_TRANSACTIONS: Transaction[] = [
//     {
//         id: "1",
//         type: "expense",
//         amount: 45.5,
//         category: "Food & Dining",
//         description: "Grocery shopping",
//         date: "2025-11-28",
//     },
//     {
//         id: "2",
//         type: "income",
//         amount: 3000,
//         category: "Salary",
//         description: "Monthly salary",
//         date: "2025-11-25",
//     },
//     {
//         id: "3",
//         type: "expense",
//         amount: 89.99,
//         category: "Shopping",
//         description: "New shoes",
//         date: "2025-11-26",
//     },
//     {
//         id: "4",
//         type: "expense",
//         amount: 120,
//         category: "Transportation",
//         description: "Gas refill",
//         date: "2025-11-27",
//     },
//     {
//         id: "5",
//         type: "expense",
//         amount: 25.99,
//         category: "Entertainment",
//         description: "Movie tickets",
//         date: "2025-11-24",
//     },
//     {
//         id: "6",
//         type: "income",
//         amount: 500,
//         category: "Freelance",
//         description: "Web design project",
//         date: "2025-11-23",
//     },
//     {
//         id: "7",
//         type: "income",
//         amount: 500,
//         category: "Freelance",
//         description: "Web design project",
//         date: "2025-11-23",
//     },
//     {
//         id: "8",
//         type: "income",
//         amount: 500,
//         category: "Freelance",
//         description: "Web design project",
//         date: "2025-11-23",
//     },
//     {
//         id: "9",
//         type: "expense",
//         amount: 500,
//         category: "Freelance",
//         description: "Web design project",
//         date: "2025-11-23",
//     },
//     {
//         id: "10",
//         type: "income",
//         amount: 500,
//         category: "Freelance",
//         description: "Web design project",
//         date: "2025-11-23",
//     },
//     {
//         id: "11",
//         type: "expense",
//         amount: 500,
//         category: "Freelance",
//         description: "Web design project",
//         date: "2025-11-23",
//     },
// ];

export default async function Home() {
    const user = await currentUser();
    if (user) {
        await createUser();
    }

    const transactions = await getTransactions({ p: 1 });
    const INITIAL_TRANSACTIONS = transactions.data ?? [];

    const totalIncome = INITIAL_TRANSACTIONS.filter(
        (t) => t.type === "income"
    ).reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = INITIAL_TRANSACTIONS.filter(
        (t) => t.type === "expense"
    ).reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpenses;

    // --- Calculate last month totals ---

    const thisMonthStart = startOfMonth(new Date());
    const lastMonthStart = startOfMonth(subMonths(new Date(), 1));

    const lastMonthIncome = INITIAL_TRANSACTIONS.filter(
        (t) =>
            t.type === "income" &&
            isAfter(new Date(t.date), lastMonthStart) &&
            isBefore(new Date(t.date), thisMonthStart)
    ).reduce((sum, t) => sum + t.amount, 0);

    const lastMonthExpenses = INITIAL_TRANSACTIONS.filter(
        (t) =>
            t.type === "expense" &&
            isAfter(new Date(t.date), lastMonthStart) &&
            isBefore(new Date(t.date), thisMonthStart)
    ).reduce((sum, t) => sum + t.amount, 0);
    

    // useEffect(() => {
    //     const saveUser = async() => {
    //         await createUser()
    //     }
    //     saveUser()
    // }, [user])
    return (
        <div className="bg-gray-50 min-h-screen w-full max-w-7xl mx-auto flex flex-col lg:flex-row">
            {/* <Navbar/> */}
            <section className="w-full lg:w-[60%]">
                <BalanceInfoCard
                    totalIncome={totalIncome}
                    totalExpenses={totalExpenses}
                    balance={balance}
                    lastIncome={lastMonthIncome}
                    lastExpense={lastMonthExpenses}
                />

                <ExpenseChart data={INITIAL_TRANSACTIONS} />
                <IncomeExpenseChart data={INITIAL_TRANSACTIONS} />
            </section>

            <div className="w-full lg:w-[40%]">
                <RecentTransactions data={INITIAL_TRANSACTIONS} />
            </div>
        </div>
    );
}
