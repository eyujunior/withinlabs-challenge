// components/ProductsView.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import ProductCard from "@/app/components/products/ProductCard";
import Pagination from "@/app/components/ui/Pagination";
import { Product } from "@/app/types/product";

const ProductFilters = ({
    products,
    categories,
    initialPage,
    initialCategory,
}: {
    products: Product[];
    categories: string[];
    initialPage: number;
    initialCategory: string;
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Get current page from URL
    const currentPageFromUrl = searchParams.get("page") ? parseInt(searchParams.get("page") as string) : 1;

    // State for filters
    const [page, setPage] = useState(currentPageFromUrl);
    const [category, setCategory] = useState(initialCategory);
    const [searchTerm, setSearchTerm] = useState("");
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

    // Sync page state with URL changes
    useEffect(() => {
        setPage(currentPageFromUrl);
    }, [currentPageFromUrl]);

    // Filter and paginate products
    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            searchTerm === "" ||
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
        const matchesCategory = !category || product.category === category;

        return matchesSearch && matchesPrice && matchesCategory;
    });

    const itemsPerPage = 12;
    const totalItems = filteredProducts.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginatedProducts = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="w-full md:w-64 space-y-4">
                {/* Search Input */}
                <div className="relative">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search products..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                    <svg
                        className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>

                {/* Category Filter */}
                <select
                    aria-label="Filter by category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all sr-only">
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                {/* Price Range Filter */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Price Range: ${priceRange.min} - ${priceRange.max}
                    </label>
                    <div className="flex gap-4 items-center">
                        <label htmlFor="min-range" className="sr-only">
                            Min
                        </label>
                        <label htmlFor="max-range" className="sr-only">
                            Max
                        </label>
                        <input
                            id="min-range"
                            type="range"
                            min="0"
                            max={priceRange.max}
                            value={priceRange.min}
                            onChange={(e) => {
                                const newMin = Number(e.target.value);
                                setPriceRange((prev) => ({
                                    min: newMin,
                                    max: newMin > prev.max ? newMin : prev.max, // Ensure max is always >= min
                                }));
                            }}
                            className="w-full"
                        />
                        <input
                            id="max-range"
                            type="range"
                            min={priceRange.min}
                            max="1000"
                            value={priceRange.max}
                            onChange={(e) => {
                                const newMax = Number(e.target.value);
                                setPriceRange((prev) => ({
                                    min: newMax < prev.min ? newMax : prev.min, // Ensure min is always <= max
                                    max: newMax,
                                }));
                            }}
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Reset Filters Button */}
                <button
                    onClick={() => {
                        setSearchTerm("");
                        setCategory("");
                        setPriceRange({ min: 0, max: 1000 });
                    }}
                    className="w-full px-4 py-2 text-sm text-blue-600 hover:text-blue-800">
                    Reset Filters
                </button>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
                {/* Product Count */}
                <div className="mb-4 text-sm text-gray-600">
                    Showing {paginatedProducts.length} of {totalItems} products
                    {searchTerm && ` matching "${searchTerm}"`}
                    {(priceRange.min > 0 || priceRange.max < 1000) && ` (Price: $${priceRange.min}-$${priceRange.max})`}
                </div>

                {/* Products */}
                {paginatedProducts.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {paginatedProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    id={product.id}
                                    title={product.title}
                                    price={product.price}
                                    tags={product.tags}
                                    thumbnail={product.thumbnail}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        <Pagination currentPage={page} totalPages={totalPages} basePath={pathname} />
                    </>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No products found matching your filters</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductFilters;
