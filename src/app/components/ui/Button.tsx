import Link from "next/link";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "ghost" | "solid" | "outline"; // Add more variants as needed
    className?: string;
    asChild?: boolean;
    href?: string; // For link behavior
}

const Button: React.FC<ButtonProps> = ({ variant = "solid", className, asChild, href, children, ...props }) => {
    const baseClasses = "px-4 py-2 rounded focus:outline-none rounded-md";
    const variantClasses =
        variant === "ghost"
            ? "bg-transparent text-blue-500"
            : variant === "outline"
            ? "bg-transparent border-blue-500 text-blue"
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
