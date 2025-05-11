import { Skeleton } from "@/components/ui/skeleton";

function AuthorNameSkeleton() {
  return (
    <div className="flex items-center rounded-md bg-gray-50 px-2 py-1 text-sm font-medium text-gray-600">
      <Skeleton className="h-4 w-16" />
    </div>
  );
}

export default AuthorNameSkeleton;
