import { Skeleton } from "@/components/ui/skeleton";

function OrderSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 mt-20">
      <div className="max-w-3xl mx-auto space-y-6">
        {Array(4)
          .fill(1)
          .map((_, index) => (
            <div key={index} className="flex flex-row gap-5 items-center pb-6">
              {/* Cover image skeleton */}
              <div className="aspect-[3/4] max-w-[145px] w-full">
                <Skeleton className="w-full h-full rounded-lg" />
              </div>

              {/* Details skeleton */}
              <div className="flex flex-1 flex-col gap-4 justify-center">
                <Skeleton className="w-[80%] h-6" />
                <Skeleton className="w-[60%] h-6" />
                <Skeleton className="w-[30%] h-6" />
                <Skeleton className="w-[40%] h-6" />
                <Skeleton className="w-[20%] h-6" />
              </div>

              {/* Action buttons skeleton */}
              <div className="flex flex-col gap-3 w-[120px]">
                <Skeleton className="w-full h-6" />
                <Skeleton className="w-full h-6" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default OrderSkeleton;
