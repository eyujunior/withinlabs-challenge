export type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    tags: string[];
    images: string[];
};

export type ProductsResponse = {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
};

export type Review = {
    id: number;
    body: string;
    userId: number;
    productId: number;
    date: string;
    user: {
        fullName: string;
    };
};
