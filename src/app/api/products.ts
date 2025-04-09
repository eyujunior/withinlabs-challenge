import { ProductsResponse } from "@/app/types/product";

const API_URL = "https://dummyjson.com/products";

export async function getProducts(page: number = 1, limit: number = 10, categories: string = ''): Promise<ProductsResponse> {
    const skip = (page - 1) * limit;
    const res = await fetch(`${API_URL}/categories/${categories}?limit=${limit}&skip=${skip}`);
    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }
    return res.json();
}

export async function getAllProducts(): Promise<ProductsResponse> {
    const res = await fetch(`${API_URL}?limit=0`);
    if (!res.ok) {
        throw new Error("Failed to fetch all products");
    }
    return res.json();
}
