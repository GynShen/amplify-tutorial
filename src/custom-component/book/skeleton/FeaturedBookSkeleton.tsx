import { Skeleton } from "@/components/ui/skeleton";

function FeaturedBookSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 mt-20">
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill("1")
          .map((_, i) => (
            <div key={i} className="w-50 aspect-3 flex flex-col space-y-3">
              {/* Cover image skeleton */}
              <Skeleton className="h-[300px] w-full rounded-lg" />
              {/* Details skeleton */}
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex space-x-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
      </div>
    </div>
  );
}

export default FeaturedBookSkeleton;
