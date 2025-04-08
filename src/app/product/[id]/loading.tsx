export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse">
                {/* Back button skeleton */}
                <div className="h-8 w-24 bg-gray-200 rounded mb-4"></div>

                {/* Product grid skeleton */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Image gallery skeleton */}
                    <div>
                        <div className="h-96 bg-gray-200 rounded-lg mb-4"></div>
                        <div className="grid grid-cols-4 gap-2">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="h-20 bg-gray-200 rounded"></div>
                            ))}
                        </div>
                    </div>

                    {/* Product info skeleton */}
                    <div className="space-y-4">
                        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                        </div>
                        <div className="h-24 bg-gray-200 rounded"></div>
                        <div className="h-12 bg-gray-200 rounded w-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
