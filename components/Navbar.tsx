import { UserButton } from "@clerk/nextjs";
import FormModal from "./FormModal";
import Link from "next/link";

const Navbar = () => {
    return (
        <div className="sticky z-10 top-0 p-4 w-full flex items-center justify-between bg-white border-b border-gray-200">
            <Link
                href="/"
                className="text-4xl md:text-4xl font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-slate-300 via-slate-700 to-slate-900"
            >
                OmaKharcha
            </Link>

            <div className="flex items-center gap-3">
                {/* <button className="p-1.5 text-white bg-gray-900 rounded-lg px-5 cursor-pointer">
                    Add Transaction
                </button> */}
                <FormModal action="create" />
                <UserButton
                    appearance={{
                        elements: {
                            userButtonAvatarBox: "!w-10 !h-10 shadow-sm",
                            userButtonPopoverCard:
                                "border border-zinc-200 shadow-lg",
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default Navbar;
