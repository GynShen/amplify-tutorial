import React from "react";
import useAllCategory from "./custom-hook/useAllCategory";
import { Link } from "react-router";

export default function AllCategoryPage() {
  const { allCategory, allCategoryError, allCategoryLoading } =
    useAllCategory();
  if (allCategoryLoading) {
    return <div>Loading ... </div>;
  }

  if (allCategoryError) {
    return <div>Error fetching category</div>;
  }

  return (
    <div className="w-full flex justify-center py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 max-w-xl w-full">
        {allCategory &&
          allCategory?.length > 0 &&
          allCategory.map((category) => (
            <Link to={`/search/${category.categoryName}`}>
              <div
                key={category.categoryId}
                className="bg-gray-100 text-gray-700 text-center text-sm font-medium px-4 py-2 rounded shadow-sm hover:bg-gray-300 transition"
              >
                {category.categoryName}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
