const CardSkeleton: React.FC = () => {
  return (
    <div className="border-2 border-gray-900 rounded-md w-full aspect-[7/10] relative overflow-hidden">
      {/* Shimmer overlay */}
      <div className="absolute inset-0 z-10 skeleton-shimmer"></div>

      {/* Image */}
      <div className="rounded-t-sm w-full h-[60%] bg-gray-700"></div>

      {/* Name and age */}
      <div className="flex gap-2 m-4 mb-2 items-baseline">
        <div className="h-6 w-40 bg-gray-700 rounded-md"></div>
        <div className="h-6 w-10 bg-gray-700 rounded-md"></div>
      </div>

      {/* Info container */}
      <div className="flex gap-4 ml-4">
        {/* Location */}
        <div className="h-4 w-16 bg-gray-700 rounded-md"></div>
        {/* Breed */}
        <div className="h-4 w-12 bg-gray-700 rounded-md"></div>
        {/* Gender */}
        <div className="h-4 w-8 bg-gray-700 rounded-md"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
