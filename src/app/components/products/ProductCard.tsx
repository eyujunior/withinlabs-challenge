import React from "react";
import Link from "next/link";
import Image from "next/image";
interface ProductCardProps {
    title: string;
    price: number;
    thumbnail: string;
    tags: string[];
    id: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, price, thumbnail, tags, id }) => {
    return (
        <Link href={`/product/${id}`} className="rounded-md overflow-hidden shadow-xl shadow-gray-100 p-4 bg-white">
            <Image className="w-full object-cover" priority width={900} height={900} src={thumbnail} alt={title} />
            <div className="mt-4">
                <h2 className="font-semibold text-gray-800">{title}</h2>
                <p className="text-gray-600 mt-1">${price.toFixed(2)}</p>
                <div className="mt-2">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="inline-block bg-blue-50 capitalize text-blue-600 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
