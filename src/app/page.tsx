import { getProducts } from "@/app/api/products";
import ProductCard from "@/app/components/products/ProductCard";
import Pagination from "@/app/components/ui/Pagination";
import { Product } from "@/app/types/product";

const cache = new Map();

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    // Await searchParams to access its properties
    const params = await searchParams;
    const page = params.page ? parseInt(params.page as string) : 1;
    const limit = 12;

    // Cache key based on page number
    const cacheKey = `products_page_${page}`;

    let productsData;

    // Check if data is in cache
    if (cache.has(cacheKey)) {
        productsData = cache.get(cacheKey);
    } else {
        // Fetch from API if not in cache
        console.log(`Fetching products for page ${page} from API...`);
        productsData = await getProducts(page, limit);
        cache.set(cacheKey, productsData); // Store in cache
    }

    const { products, total } = productsData;
    const totalPages = Math.ceil(total / limit);

    return (
        <div className="">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h1>

                {/* Products Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map((product: Product) => (
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
                    <Pagination currentPage={page} totalPages={totalPages} basePath="/" />
                </div>
            </div>
        </div>
    );
}
