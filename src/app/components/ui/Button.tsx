import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "ghost" | "solid" | "outline" | "red";
    className?: string;
    asChild?: boolean;
    href?: string;
}

const Button: React.FC<ButtonProps> = ({ variant = "solid", className, asChild, href, children, ...props }) => {
    const baseClasses =
        "px-4 py-2 rounded focus:outline-none rounded-md cursor-pointer transition-all duration-300 ease-in";
    const variantClasses =
        variant === "ghost"
            ? "bg-transparent text-gray-700"
            : variant === "outline"
            ? "bg-transparent border-blue-500 text-blue"
            : variant === "red"
            ? "bg-transparent text-red-500"
            : "bg-blue-500 text-white";

    const classes = `${baseClasses} ${variantClasses} ${className}`;

    if (asChild && href) {
        return (
            <Link href={href} className={classes}>
                {children}
            </Link>
        );
    }

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
};

export default Button;
