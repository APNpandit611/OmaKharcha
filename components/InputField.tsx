import React from "react";
import { FieldError } from "react-hook-form";
import { Label } from "./ui/label";

type InputFieldProps = {
    name: string;
    label: string;
    formType?: string; // inputfileld type
    defaultValue?: string | number;
    register: any;
    // error?: FieldError | undefined;
    error?: { message?: string } | undefined;

    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const InputField = ({
    name,
    label,
    formType,
    defaultValue,
    register,
    error,
    inputProps,
}: InputFieldProps) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label>{label}</Label>
            <input
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm border-none w-full"
                type={formType}
                defaultValue={defaultValue}
                {...register(name)}
                {...inputProps}
            />
            {error?.message && (
                <p className="text-xs text-red-400">{error?.message}</p>
            )}
        </div>
    );
};

export default InputField;
