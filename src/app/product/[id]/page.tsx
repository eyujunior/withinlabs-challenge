import { notFound } from "next/navigation";
import Image from "next/image";
import BackButton from "@/app/components/ui/BackButton";
import Rating from "@/app/components/ui/Rating";
import ReviewCard from "@/app/components/ui/ReviewCard";
import { Product, Review } from "@/app/types/product";
import { AddToCart } from "@/app/components/AddToCart";

async function getProduct(id: string): Promise<{
    product: Product;
    reviews: Review[];
}> {
    const res = await Promise.all([
        fetch(`https://dummyjson.com/products/${id}`),
        fetch(`https://dummyjson.com/comments/post/${id}`),
    ]);

    if (!res[0].ok) throw new Error("Failed to fetch product");

    return {
        product: await res[0].json(),
        reviews: await res[1].json().then((data) => data.comments || []),
    };
}

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    let data;

    try {
        data = await getProduct(params.id);
    } catch (error) {
        notFound();
    }

    const { product, reviews } = data;

    return (
        <div className="bg-[#fafaf4]">
            <div className="container mx-auto px-4 py-8">
                {/* Back button */}
                <BackButton/>
                    
                {/* Product Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Image Gallery */}
                    <div>
                        <div className="rounded-lg overflow-hidden mb-4">
                            <Image
                                src={product.images[0]}
                                alt={product.title}
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
                        <div className="flex items-center mb-4">
                            <Rating value={product.rating} />
                            <span className="ml-2 text-sm text-gray-600">
                                {/* {product.rating.toFixed(1)} ({reviews.length} reviews) */}
                                {product.rating.toFixed(1)}
                            </span>
                            <span className="mx-2">|</span>
                            <span className="text-sm text-green-600">{product.stock} in stock</span>
                        </div>

                        <div className="mb-6">
                            {product.discountPercentage > 0 && (
                                <div className="flex items-center">
                                    <span className="text-3xl font-bold text-gray-900">
                                        $
                                        {calculateDiscountedPrice(product.price, product.discountPercentage).toFixed(2)}
                                    </span>
                                    <span className="ml-2 text-lg text-gray-500 line-through">
                                        ${product.price.toFixed(2)}
                                    </span>
                                    <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
                                        {Math.round(product.discountPercentage)}% OFF
                                    </span>
                                </div>
                            )}
                            {product.discountPercentage <= 0 && (
                                <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                            )}
                        </div>

                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-2">Description</h2>
                            <p className="text-gray-700">{product.description}</p>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-2">Specifications</h2>
                            <ul className="space-y-2">
                                <li className="flex">
                                    <span className="text-gray-500 w-32">Brand</span>
                                    <span>{product.brand}</span>
                                </li>
                                <li className="flex">
                                    <span className="text-gray-500 w-32">Category</span>
                                    <span className="capitalize">{product.category}</span>
                                </li>
                                <li className="flex">
                                    <span className="text-gray-500 w-32">Availability</span>
                                    <span>{product.stock > 0 ? "In Stock" : "Out of Stock"}</span>
                                </li>
                            </ul>
                        </div>

                        <AddToCart product={product} />
                    </div>
                </div>

                {/* Reviews Section */}
                <section className="mt-12 border-t border-t-gray-200 pt-8">
                    <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

                    {reviews.length > 0 ? (
                        <div className="space-y-6">
                            {reviews.map((review) => (
                                <ReviewCard key={review.id} review={review} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No reviews yet.</p>
                    )}
                </section>
            </div>
        </div>
    );
}

function calculateDiscountedPrice(price: number, discount: number): number {
    return price * (1 - discount / 100);
}
