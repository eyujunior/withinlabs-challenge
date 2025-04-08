import { Review } from "@/app/types/product";

interface ReviewCardProps {
    review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
    return (
        <div className="border-b pb-6 last:border-b-0 last:pb-0">
            <div className="flex items-start gap-4">
                {/* User Avatar */}
                <div className="flex-shrink-0">
                    <div className="relative h-10 w-10 rounded-full bg-gray-100 overflow-hidden">
                        {
                            <div className="flex items-center justify-center h-full w-full bg-blue-500 text-white font-medium">
                                {review.user.fullName?.charAt(0).toUpperCase()}
                            </div>
                        }
                    </div>
                </div>

                {/* Review Content */}
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-900">{review.user.fullName}</h4>
                    </div>

                    {/* Comment */}
                    <p className="text-gray-700 mt-4">{review.body}</p>
                </div>
            </div>
        </div>
    );
}
