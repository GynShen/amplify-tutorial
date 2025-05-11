import { Link } from "react-router";
import { BookReturnType } from "./types/book-types";
type EachBookGridProps = {
  book: BookReturnType;
};

function EachBookGrid({ book }: EachBookGridProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Image cover container */}
      <div>
        <Link to={`/book/${book.bookId}`} className="hover:opacity-80">
          <div className="h-[300px] aspect-[2/3] overflow-hidden rounded-lg bg-gray-100">
            <img
              src={book.bookImage}
              alt={book.bookTitle}
              className="w-full h-full object-fit"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/160x240?text=No+Cover";
              }}
            />
          </div>
        </Link>

        <div className="mt-4 max-w-[200px]">
          <h3 className="text-sm font-medium text-gray-900">
            {book.bookTitle}
          </h3>
          {!book.bookAuthor ? (
            <p className="mt-1 text-sm text-gray-500">No author found</p>
          ) : (
            <div className="flex flex-wrap gap-x-3">
              <span
                key={book.bookAuthor}
                className="mt-1 p-1 border-2 rounded-lg text-sm text-gray-500"
              >
                {book.bookAuthor}
              </span>
            </div>
          )}
          <p className="mt-1 text-sm font-medium text-gray-900">
            {`Published Date: ${
              new Date(book.bookPublicationDate).toLocaleDateString() ?? "N/A"
            }`}
          </p>
          <p className="mt-2 text-lg font-bold text-grey-600">
            RM {book.bookPrice}
          </p>
        </div>
      </div>
    </div>
  );
}

export default EachBookGrid;
