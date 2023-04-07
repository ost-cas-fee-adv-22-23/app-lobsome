export const SkeletonCard = () => {
  return (
    <div className="w-full">
      <div className="flex gap-2 w-72 h-16 items-center">
        <div className="w-16 h-full bg-gray-200 animate-pulse rounded-full"></div>
        <div className="w-24 h-12 bg-gray-200 animate-pulse rounded-xl"></div>
      </div>
      <div className="mt-2 w-full h-8 bg-gray-200 animate-pulse rounded-xl"></div>
      <div className="flex gap-2">
        <div className="mt-2 w-24 h-8 bg-gray-200 animate-pulse rounded-xl"></div>
        <div className="mt-2 w-24 h-8 bg-gray-200 animate-pulse rounded-xl"></div>
      </div>
    </div>
  );
};
