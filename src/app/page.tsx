import { getProducts, getAllProducts } from "@/app/api/products";
import ProductCard from "@/app/components/products/ProductCard";
import Pagination from "@/app/components/ui/Pagination";

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const page = searchParams.page ? parseInt(searchParams.page as string) : 1;
    const limit = 10;

    const { products, total } = await getProducts(page, limit);
    const totalPages = Math.ceil(total / limit);

    return (
        <div className="">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h1>

                {/* Products Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map((product) => (
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
                    <Pagination currentPage={page} totalPages={totalPages} basePath="/products" />
                </div>
            </div>
        </div>
    );
}
