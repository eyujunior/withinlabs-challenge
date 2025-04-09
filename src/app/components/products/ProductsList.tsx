// components/products/ProductsList.tsx
"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/app/components/products/ProductCard";
import Pagination from "@/app/components/ui/Pagination";
import { Product } from "@/app/types/product";

interface ProductsListProps {
    allProducts: Product[];
    initialProducts: Product[];
    page: number;
    totalPages: number;
    category: string;
}

const ProductsList = ({ allProducts, initialProducts, page, totalPages, category }: ProductsListProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [currentPage, setCurrentPage] = useState(page);

    // Filter products based on search term and price range
    const filteredProducts = useMemo(() => {
        let filtered = allProducts;

        if (searchTerm) {
            filtered = filtered.filter(
                (product) =>
                    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        filtered = filtered.filter((product) => product.price >= priceRange.min && product.price <= priceRange.max);

        return filtered;
    }, [allProducts, searchTerm, priceRange]);

    // Paginate filtered results
    const paginatedProducts = useMemo(() => {
        const limit = 12;
        const startIndex = (currentPage - 1) * limit;
        return filteredProducts.slice(startIndex, startIndex + limit);
    }, [filteredProducts, currentPage]);

    const totalFilteredPages = Math.ceil(filteredProducts.length / 12);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    const handlePriceChange = (min: number, max: number) => {
        setPriceRange({ min, max });
        setCurrentPage(1);
    };

    return (
        <div className="flex-1">
            {/* Search results info */}
            {(searchTerm || priceRange.min > 0 || priceRange.max < 1000) && (
                <div className="mb-4 text-sm text-gray-500">
                    Showing {filteredProducts.length} results
                    {searchTerm && ` for "${searchTerm}"`}
                    {(priceRange.min > 0 || priceRange.max < 1000) && ` (Price: $${priceRange.min}-$${priceRange.max})`}
                </div>
            )}

            {/* Products Grid */}
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
                    <div className="mt-10">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={
                                searchTerm || priceRange.min > 0 || priceRange.max < 1000
                                    ? totalFilteredPages
                                    : totalPages
                            }
                            basePath={category ? `/?category=${category}` : "/"}
                        />
                    </div>
                </>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-500">No products found matching your filters</p>
                </div>
            )}
        </div>
    );
};

export default ProductsList;
