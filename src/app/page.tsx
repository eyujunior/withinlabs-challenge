// app/products/page.tsx
import { Product } from "@/app/types/product";
import ProductFilters from "@/app/components/products/ProductFilters";

async function getCategories(): Promise<string[]> {
    const res = await fetch("https://dummyjson.com/products/category-list");
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
}

export default async function ProductsPage({ searchParams }: { searchParams: any }) {
    const params = await searchParams;
    const page = params.page ? parseInt(params.page as string) : 1;
    const category = (params.category as string) || "";

    // Fetch products
    let productsUrl = "https://dummyjson.com/products?limit=100";
    if (category) {
        productsUrl = `https://dummyjson.com/products/category/${category}?limit=100`;
    }

    const res = await fetch(productsUrl);
    if (!res.ok) throw new Error("Failed to fetch products");
    const { products } = await res.json();

    const categories = await getCategories();

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 min-h-[70vh]">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h1>
            <ProductFilters products={products} categories={categories} initialPage={page} initialCategory={category} />
        </div>
    );
}
