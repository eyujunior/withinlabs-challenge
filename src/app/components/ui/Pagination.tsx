// components/ui/Pagination.tsx
"use client";

import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Helper function to build page URLs with all existing search params
    const getPageUrl = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        return `${pathname}?${params.toString()}`;
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages, start + maxVisible - 1);

        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    return (
        <nav className="flex items-center justify-center space-x-2 mt-8">
            {currentPage > 1 && (
                <Link
                    href={getPageUrl(currentPage - 1)}
                    className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100">
                    Previous
                </Link>
            )}

            {getPageNumbers()[0] > 1 && (
                <>
                    <Link
                        href={getPageUrl(1)}
                        className={`px-3 py-1 rounded border ${
                            1 === currentPage
                                ? "bg-blue-500 text-white border-blue-500"
                                : "border-gray-300 hover:bg-gray-100"
                        }`}>
                        1
                    </Link>
                    {getPageNumbers()[0] > 2 && <span className="px-2">...</span>}
                </>
            )}

            {getPageNumbers().map((page) => (
                <Link
                    key={page}
                    href={getPageUrl(page)}
                    className={`px-3 py-1 rounded border ${
                        page === currentPage
                            ? "bg-blue-500 text-white border-blue-500"
                            : "border-gray-300 hover:bg-gray-100"
                    }`}>
                    {page}
                </Link>
            ))}

            {getPageNumbers().slice(-1)[0] < totalPages && (
                <>
                    {getPageNumbers().slice(-1)[0] < totalPages - 1 && <span className="px-2">...</span>}
                    <Link
                        href={getPageUrl(totalPages)}
                        className={`px-3 py-1 rounded border ${
                            totalPages === currentPage
                                ? "bg-blue-500 text-white border-blue-500"
                                : "border-gray-300 hover:bg-gray-100"
                        }`}>
                        {totalPages}
                    </Link>
                </>
            )}

            {currentPage < totalPages && (
                <Link
                    href={getPageUrl(currentPage + 1)}
                    className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100">
                    Next
                </Link>
            )}
        </nav>
    );
}
