// hooks/useCart.ts
import { useCartStore } from '@/app/store/cart-store';
import { useEffect, useState } from 'react';
import { CartItem } from '@/app/store/cart-store';
import { Product } from "@/app/types/product";


interface UseCartReturn {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isHydrated: boolean;
}

export const useCart = (): UseCartReturn => {
  const [isHydrated, setIsHydrated] = useState(false);
  const store = useCartStore();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return {
    cart: store.cart,
    addToCart: store.addToCart,
    removeFromCart: store.removeFromCart,
    updateQuantity: store.updateQuantity,
    clearCart: store.clearCart,
    getTotalItems: store.getTotalItems,
    getTotalPrice: store.getTotalPrice,
    isHydrated,
  };
};