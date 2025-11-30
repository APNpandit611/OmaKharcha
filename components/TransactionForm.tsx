// "use client";
// import { FieldError, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod"; // or 'zod/v4'

// import React, { useState } from "react";
// import InputField from "./InputField";
// import { Loader2 } from "lucide-react";
// import { watch } from "fs";
// import { Label } from "./ui/label";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "./ui/select";
// import { Button } from "./ui/button";
// import { Transaction } from "@/lib/generated/prisma/client";

// const EXPENSE_CATEGORIES = [
//     "Food & Dining",
//     "Shopping",
//     "Transportation",
//     "Entertainment",
//     "Bills & Utilities",
//     "Healthcare",
//     "Education",
//     "Travel",
//     "Other",
// ];

// const INCOME_CATEGORIES = [
//     "Salary",
//     "Freelance",
//     "Business",
//     "Investments",
//     "Gifts",
//     "Other",
// ];

// const transactionSchema = z.object({
//     type: z.enum(["income", "expense"], {
//         message: "Type is required!",
//     }),

//     amount: z.coerce
//         .number()
//         .positive({ message: "Amount must be greater than 0!" }),

//     category: z.string().min(1, { message: "Category is required!" }),

//     description: z.string().min(1, { message: "Description is required!" }),

//     date: z.string().min(1, { message: "Date is required!" }),
// });

// type FormData = z.infer<typeof transactionSchema>;

// const TransactionForm = ({
//     data,
//     setOpen,
//     id,
//     action,
// }: {
//     data?: Transaction;
//     setOpen: React.Dispatch<React.SetStateAction<boolean>>;
//     id?: string;
//     action: "create" | "update";
// }) => {
//     const [loading, setLoading] = useState(false);
//     // const [type, setType] = useState<"income" | "expense">("expense");

//     const {
//         register,
//         handleSubmit,
//         setValue,
//         watch,
//         formState: { errors },
//     } = useForm<Transaction>({
//         resolver: zodResolver(transactionSchema),
//         defaultValues: {
//             type: data?.type || "expense",
//             amount: data?.amount || 0,
//             category: data?.category,
//             description: data?.description,
//             date: data?.date      
//         },
//     });

//     // const [loading, setLoading] = useState<boolean>(false)
//     const onSubmit = async (data: FormData) => {
//         console.log("Submitted:", data);

//         setLoading(true);

//         await new Promise((res) => setTimeout(res, 1000));

//         setLoading(false);
//         setOpen(false);
//     };

//     // const currentType = watch("type")
//     const currentType = "income"
  
//     return (
//         <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
//             <h1 className="text-xl font-semibold capitalize">
//                 {action} Transaction
//             </h1>

//             <div className="flex flex-col gap-7">
//                 {/* <div className="flex flex-col gap-3">
//                     <Label>Type</Label>
//                     <div className="grid grid-cols-2 gap-2">
//                         <Button
//                             type="button"
//                             // Use currentType from watch() to set the variant
//                             variant={currentType === "expense" ? "default" : "outline"}
//                             // Use setValue() to update the form state on click
//                             onClick={() => setValue("type", "expense")}
//                             className="w-full"
//                         >
//                             Expense
//                         </Button>
//                         <Button
//                             type="button"
//                             variant={currentType === "income" ? "default" : "outline"}
//                             onClick={() => setValue("type", "income")}
//                             className="w-full"
//                         >
//                             Income
//                         </Button>
//                     </div>
//                     {errors?.type?.message && (
//                         <p className="text-xs text-red-400">
//                             {errors.type.message}
//                         </p>
//                     )}
//                 </div> */}
//                 {/* <InputField
//                     label="type"
//                     type="string"
//                     register={register}
//                     name="type"
//                     error={errors.type}
//                 /> */}

//                 <InputField
//                     label="Amount"
//                     type="number"
//                     register={register}
//                     name="amount"
//                     error={errors.amount as FieldError}
//                 />

//                 {/* <InputField
//                     label="Category"
//                     type="text"
//                     register={register}
//                     name="category"
//                     error={errors.category}
//                 /> */}
//                 <div className="space-y-2">
//                     <Label htmlFor="category">Category</Label>
//                     <Select
//                         // value={type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES}
//                         // onValueChange={setCategory}
//                         {...register("category")}
//                         defaultValue={data?.category}
//                         required
//                     >
//                         <SelectTrigger id="category" className="w-full">
//                             <SelectValue placeholder="Select a category" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             {(currentType === "income"
//                                 ? INCOME_CATEGORIES
//                                 : EXPENSE_CATEGORIES
//                             ).map((cat) => (
//                                 <SelectItem key={cat} value={cat}>
//                                     {cat}
//                                 </SelectItem>
//                             ))}
//                         </SelectContent>
//                     </Select>
//                 </div>

//                 <InputField
//                     label="Description"
//                     type="text"
//                     register={register}
//                     name="description"
//                     error={errors.description}
//                 />

//                 <InputField
//                     label="Date"
//                     type="date"
//                     register={register}
//                     name="date"
//                     error={errors.date}
//                 />
//                 <div className="flex items-end justify-end w-full">
//                     <button type="submit" className="w-full p-2 bg-pie-blue text-white rounded-md cursor-pointer">
//                         {loading ? (
//                             <div className="flex items-center justify-center gap-2">
//                                 <Loader2 className="animate-spin" />
//                                 <span>
//                                     {action === "create"
//                                         ? "Creating..."
//                                         : "Updating..."}
//                                 </span>
//                             </div>
//                         ) : action === "create" ? (
//                             "Create"
//                         ) : (
//                             "Update"
//                         )}
//                     </button>
//                 </div>
//             </div>
//         </form>

//         // <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
//         //     <h1 className="text-xl font-semibold capitalize">
//         //         {action} Transaction
//         //     </h1>

//         //     <div className="flex flex-col gap-7">
//         //         {/* TYPE TOGGLE */}
//         //         <div className="flex flex-col gap-2">
//         //             <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
//         //                 Type
//         //             </label>

//         //             <div className="flex gap-3">
//         //                 {["income", "expense"].map((t) => (
//         //                     <button
//         //                         type="button"
//         //                         key={t}
//         //                         // onClick={() => setValue("type", t)}
//         //                         className={`px-4 py-2 rounded-lg border transition text-sm bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300
//         //                           `}
//         //                           // ${
//         //                           //     watch("type") === t
//         //                           //         ? "bg-blue-600 text-white border-blue-600"
//         //                           //         : "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
//         //                           // }
//         //                     >
//         //                         {t.charAt(0).toUpperCase() + t.slice(1)}
//         //                     </button>
//         //                 ))}
//         //             </div>

//         //             {errors.type && (
//         //                 <p className="text-red-500 text-xs">
//         //                     {errors.type.message}
//         //                 </p>
//         //             )}
//         //         </div>

//         //         {/* AMOUNT */}
//         //         <InputField
//         //             label="Amount"
//         //             type="number"
//         //             register={register}
//         //             name="amount"
//         //             error={errors.amount}
//         //         />

//         //         {/* CATEGORY DROPDOWN */}
//         //         <div className="flex flex-col gap-2">
//         //             <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
//         //                 Category
//         //             </label>

//         //             <select
//         //                 {...register("category")}
//         //                 className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
//         //             >
//         //                 <option value="">Select Category</option>
//         //                 <option value="food">Food</option>
//         //                 <option value="transport">Transport</option>
//         //                 <option value="shopping">Shopping</option>
//         //                 <option value="salary">Salary</option>
//         //                 <option value="bills">Bills</option>
//         //                 <option value="entertainment">Entertainment</option>
//         //                 <option value="other">Other</option>
//         //             </select>

//         //             {errors.category && (
//         //                 <p className="text-red-500 text-xs">
//         //                     {errors.category.message}
//         //                 </p>
//         //             )}
//         //         </div>

//         //         {/* DESCRIPTION */}
//         //         <InputField
//         //             label="Description"
//         //             type="text"
//         //             register={register}
//         //             name="description"
//         //             error={errors.description}
//         //         />

//         //         {/* DATE */}
//         //         <InputField
//         //             label="Date"
//         //             type="date"
//         //             register={register}
//         //             name="date"
//         //             error={errors.date}
//         //         />

//         //         {/* BUTTONS */}
//         //         <div className="flex justify-end gap-3 mt-2">
//         //             {/* CANCEL BUTTON */}
//         //             <button
//         //                 type="button"
//         //                 // onClick={onCancel}
//         //                 className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
//         //             >
//         //                 Cancel
//         //             </button>

//         //             {/* SUBMIT BUTTON */}
//         //             <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
//         //                 {loading ? (
//         //                     <div className="flex items-center gap-2">
//         //                         <Loader2 className="animate-spin" />
//         //                         <span>
//         //                             {action === "create"
//         //                                 ? "Creating..."
//         //                                 : "Updating..."}
//         //                         </span>
//         //                     </div>
//         //                 ) : action === "create" ? (
//         //                     "Create"
//         //                 ) : (
//         //                     "Update"
//         //                 )}
//         //             </button>
//         //         </div>
//         //     </div>
//         // </form>
//     );
// };

// export default TransactionForm;
