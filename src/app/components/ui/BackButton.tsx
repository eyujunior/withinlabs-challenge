"use client";

import { useRouter } from "next/navigation";

function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="px-4 py-2 focus:outline-none rounded-md cursor-pointer transition-all duration-300 ease-in bg-transparent text-gray-700 flex items-center gap-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
            Go Back
        </button>
    );
}

export default BackButton;
