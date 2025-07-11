export const LoadingCard = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-gray-300"></div>
      
      {/* Content Skeleton */}
      <div className="p-6">
        {/* Title and Price */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 mr-2">
            <div className="h-6 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
          <div className="h-8 w-16 bg-gray-300 rounded"></div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 w-4 bg-gray-300 rounded"></div>
            ))}
          </div>
          <div className="h-4 w-12 bg-gray-300 rounded"></div>
          <div className="h-4 w-20 bg-gray-300 rounded"></div>
        </div>

        {/* Tags */}
        <div className="flex space-x-2 mb-4">
          <div className="h-6 w-16 bg-gray-300 rounded-md"></div>
          <div className="h-6 w-20 bg-gray-300 rounded-md"></div>
          <div className="h-6 w-14 bg-gray-300 rounded-md"></div>
        </div>

        {/* File Info */}
        <div className="flex justify-between mb-4">
          <div className="h-3 w-20 bg-gray-300 rounded"></div>
          <div className="h-3 w-24 bg-gray-300 rounded"></div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-2">
          <div className="flex-1 h-10 bg-gray-300 rounded-lg"></div>
          <div className="h-10 w-24 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}; 