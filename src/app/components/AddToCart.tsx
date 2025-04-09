// components/add-to-cart.tsx
"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useCart } from "@/app/hooks/useCart";
import Button from "@/app/components/ui/Button";
import { Product } from "@/app/types/product";

interface AddToCartProps {
    product: Product;
}

export function AddToCart({ product }: AddToCartProps) {
    const [quantity, setQuantity] = useState<number>(1);
    const { addToCart, isHydrated } = useCart();

    const handleAddToCart = () => {
        addToCart(product, quantity);
        toast.success("Product added to cart!");
    };

    if (!isHydrated) {
        return (
            <div className="flex space-x-4 mb-8">
                <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
        );
    }

    return (
        <div className="flex space-x-4 mb-8">
            <div className="flex items-center border rounded-md overflow-hidden">
                <Button
                    variant="ghost"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200">
                    -
                </Button>
                <span className="px-4 py-2 w-12 text-center">{quantity}</span>
                <Button
                    variant="ghost"
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200">
                    +
                </Button>
            </div>
            <Button className="flex-1" onClick={handleAddToCart}>
                Add to Cart ({quantity})
            </Button>
        </div>
    );
}
