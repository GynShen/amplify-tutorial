import { Skeleton } from "@/components/ui/skeleton";

function BookSkeleton() {
  return (
    <div className="flex flex-col items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-30 lg:gap-y-20 m-5">
        {Array(12)
          .fill("1")
          .map((_, i) => (
            <div key={i} className="w-55 aspect-[2/3] flex flex-col space-y-3">
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

export default BookSkeleton;
