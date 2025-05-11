import { Skeleton } from "@/components/ui/skeleton";

function CartSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 mt-20">
      <div className="max-w-3xl mx-auto space-y-6">
        {Array(4)
          .fill(1)
          .map((cart) => (
            <div className="w-full aspect-3 flex flex-row space-y-3 gap-5 items-center">
              {/* Cover image skeleton */}
              <Skeleton className="w-[250px] h-[350px] aspect-3 rounded-lg" />
              <div className="flex flex-1 flex-col gap-5">
                {/* Details skeleton */}
                <Skeleton className="w-[80%] h-10" />
                <Skeleton className="w-1/3 h-10" />
                <div className="flex space-x-2">
                  <Skeleton className="h-10 rounded-full w-10" />
                  <Skeleton className="h-10 rounded-full w-10" />
                  <Skeleton className="h-10 rounded-full w-24 ml-auto" />
                </div>
                <Skeleton className="h-10 w-1/3" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CartSkeleton;
