"use client";

import { useState } from "react";

const Rating = ({
    value,
    editable = false,
    onChange,
}: {
    value: number;
    editable?: boolean;
    onChange?: (value: number) => void;
}) => {
    const [hover, setHover] = useState<number | null>(null);

    return (
        <div className="flex">
            {[...Array(5)].map((_, i) => {
                const ratingValue = i + 1;
                return (
                    <button
                        key={i}
                        type={editable ? "button" : undefined}
                        className={`${ratingValue <= (hover || value) ? " text-yellow-400" : "text-gray-300"}`}
                        onClick={() => editable && onChange?.(ratingValue)}
                        onMouseEnter={() => editable && setHover(ratingValue)}
                        onMouseLeave={() => editable && setHover(null)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="none"
                            className="w-4 h-4">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                            />
                        </svg>
                    </button>
                );
            })}
        </div>
    );
};

export default Rating;
