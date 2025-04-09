"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/app/hooks/useCart";
import Button from "@/app/components/ui/Button";
import Image from "next/image";

export function Cart() {
    const [isOpen, setIsOpen] = useState(false);
    const { cart, removeFromCart, updateQuantity, getTotalItems, getTotalPrice, clearCart, isHydrated } = useCart();

    if (!isHydrated) {
        return (
            <div className="relative">
                <button className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                        />
                    </svg>
                </button>
            </div>
        );
    }

    return (
        <div className="relative">
            <button
                aria-label="Open Cart"
                onClick={() => setIsOpen(true)}
                className="relative p-2 rounded-full hover:bg-gray-100 cursor-pointer">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                </svg>
                {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {getTotalItems()}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-hidden">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
                    <div className="absolute inset-y-0 right-0 max-w-full flex">
                        <div className="w-screen max-w-md">
                            <div className="h-full flex flex-col bg-white shadow-xl">
                                <div className="flex-1 overflow-y-auto p-6">
                                    <div className="flex items-start justify-between">
                                        <h2 className="text-lg font-medium">Shopping Cart</h2>
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="p-1 text-gray-400 hover:text-gray-500">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="h-6 w-6">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6 18 18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="mt-8">
                                        {cart.length === 0 ? (
                                            <p className="text-gray-500">Your cart is empty</p>
                                        ) : (
                                            <div className="flow-root">
                                                <ul className="-my-6 divide-y divide-gray-200">
                                                    {cart.map((item) => (
                                                        <li key={item.product.id} className="py-6 flex">
                                                            <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                                                <Image
                                                                    width={600}
                                                                    height={600}
                                                                    src={item.product.thumbnail}
                                                                    alt={item.product.title}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>

                                                            <div className="ml-4 flex-1 flex flex-col">
                                                                <div>
                                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                                        <h3>{item.product.title}</h3>
                                                                        <p className="ml-4">
                                                                            $
                                                                            {(
                                                                                item.product.price * item.quantity
                                                                            ).toFixed(2)}
                                                                        </p>
                                                                    </div>
                                                                    <p className="mt-1 text-sm text-gray-500">
                                                                        {item.product.category}
                                                                    </p>
                                                                </div>

                                                                <div className="flex-1 flex items-end justify-between text-sm">
                                                                    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden mt-1">
                                                                        <Button
                                                                            variant="ghost"
                                                                            onClick={() =>
                                                                                updateQuantity(
                                                                                    item.product.id,
                                                                                    Math.max(1, item.quantity - 1)
                                                                                )
                                                                            }
                                                                            className="px-2 py-1 bg-gray-100 hover:bg-gray-200">
                                                                            -
                                                                        </Button>
                                                                        <span className="px-2 py-1 w-8 text-center">
                                                                            {item.quantity}
                                                                        </span>
                                                                        <Button
                                                                            variant="ghost"
                                                                            onClick={() =>
                                                                                updateQuantity(
                                                                                    item.product.id,
                                                                                    item.quantity + 1
                                                                                )
                                                                            }
                                                                            className="px-2 py-1 bg-gray-100 hover:bg-gray-200">
                                                                            +
                                                                        </Button>
                                                                    </div>

                                                                    <Button
                                                                        variant="red"
                                                                        onClick={() => removeFromCart(item.product.id)}
                                                                        className="font-medium">
                                                                        Remove
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {cart.length > 0 && (
                                    <div className="border-t border-gray-200 p-6">
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <p>Subtotal</p>
                                            <p>${getTotalPrice().toFixed(2)}</p>
                                        </div>
                                        <div className="mt-6">
                                            <Button className="w-full" asChild>
                                                <Link href="/checkout">Checkout</Link>
                                            </Button>
                                        </div>
                                        <div className="mt-4 flex justify-center text-sm text-gray-500">
                                            <Button variant="red" onClick={clearCart}>
                                                Clear Cart
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
