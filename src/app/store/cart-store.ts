// store/cart-store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/app/types/product";

export type CartItem = {
    product: Product;
    quantity: number;
};

type CartStore = {
    cart: CartItem[];
    addToCart: (product: Product, quantity: number) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
};

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            cart: [],
            addToCart: (product, quantity) => {
                set((state) => {
                    const existingItem = state.cart.find((item) => item.product.id === product.id);

                    if (existingItem) {
                        return {
                            cart: state.cart.map((item) =>
                                item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                            ),
                        };
                    }

                    return {
                        cart: [...state.cart, { product, quantity }],
                    };
                });
            },
            removeFromCart: (productId) => {
                set((state) => ({
                    cart: state.cart.filter((item) => item.product.id !== productId),
                }));
            },
            updateQuantity: (productId, quantity) => {
                set((state) => ({
                    cart: state.cart.map((item) => (item.product.id === productId ? { ...item, quantity } : item)),
                }));
            },
            clearCart: () => {
                set({ cart: [] });
            },
            getTotalItems: () => {
                return get().cart.reduce((total, item) => total + item.quantity, 0);
            },
            getTotalPrice: () => {
                return get().cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
            },
        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
