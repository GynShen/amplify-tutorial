import { Skeleton } from "@/components/ui/skeleton";

function BookDetailSkeleton() {
  return (
    <div className="mx-auto flex flex-row space-x-5 max-w-7xl px-4 sm:px-6 lg:px-8 py-12 mt-20 w-full">
      <div className="w-80 aspect-3 flex-1">
        {/* Image skeleton */}
        <Skeleton className="aspect-[2/3]  w-full rounded-lg" />
      </div>
      <div className="flex flex-col space-y-3 flex-2">
        {/* Title skeleton */}
        <Skeleton className="h-10 w-[80%]" />
        {/* Author skeleton */}
        <div className="flex flex-col space-y-3 space-x-2">
          <Skeleton className="h-8 w-1/2" />
          <div className="flex flex-row space-x-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        {/* Description skeleton */}
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-8 w-[30%]" />
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-4 w-[80%]" />
        </div>
        {/* Subject skeleton */}
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-8 w-[30%]" />
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-4 w-[80%]" />
        </div>
        {/* Date skeleton */}
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-8 w-[30%]" />
          <Skeleton className="h-4 w-[80%]" />
        </div>
      </div>
    </div>
  );
}

export default BookDetailSkeleton;
