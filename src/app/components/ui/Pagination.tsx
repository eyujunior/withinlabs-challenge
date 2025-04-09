// components/Pagination.tsx
import Link from "next/link";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <nav className="flex items-center justify-center space-x-2">
            {currentPage > 1 && (
                <Link
                    href={`${basePath}?page=${currentPage - 1}`}
                    className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100">
                    Previous
                </Link>
            )}

            {startPage > 1 && (
                <>
                    <Link
                        href={`${basePath}?page=1`}
                        className={`px-3 py-1 rounded border ${
                            1 === currentPage
                                ? "bg-blue-500 text-white border-blue-500"
                                : "border-gray-300 hover:bg-gray-100"
                        }`}>
                        1
                    </Link>
                    {startPage > 2 && <span className="px-2">...</span>}
                </>
            )}

            {pages.map((page) => (
                <Link
                    key={page}
                    href={`${basePath}?page=${page}`}
                    className={`px-3 py-1 rounded border ${
                        page === currentPage
                            ? "bg-blue-500 text-white border-blue-500"
                            : "border-gray-300 hover:bg-gray-100"
                    }`}>
                    {page}
                </Link>
            ))}

            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span className="px-2">...</span>}
                    <Link
                        href={`${basePath}?page=${totalPages}`}
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
                    href={`${basePath}?page=${currentPage + 1}`}
                    className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100">
                    Next
                </Link>
            )}
        </nav>
    );
}
