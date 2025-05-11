import React, { useState } from "react";
import useSearchBook from "./custom-hook/useSearchBook";
import { Button } from "@/components/ui/button";
import BookSkeleton from "./skeleton/SearchBookSkeleton";
import EachBookGrid from "./EachBookGrid";

const BOOK_LIMIT_PER_PAGE = 12;

export default function AllBookPage() {
  const [page, setPage] = useState<number>(0);
  const { searchBooks, searchBooksError, searchBooksLoading } = useSearchBook({
    query: "",
    page,
    pageLimit: BOOK_LIMIT_PER_PAGE,
  });
  return (
    <div className="flex flex-col min-h-[88dvh]">
      {/* Book loading */}
      {searchBooksLoading && <BookSkeleton />}

      {/* Fetching has error */}
      {searchBooksError && <div>Error fetching books...</div>}

      {/* No books found */}
      {!searchBooksLoading &&
        searchBooks &&
        page === 0 &&
        searchBooks.length === 0 && (
          <div className="m-16 mt-24">No books found</div>
        )}

      {/* User has reached the end */}
      {!searchBooksLoading &&
        searchBooks &&
        page > 0 &&
        searchBooks.length === 0 && (
          <div className="m-16 mt-24">You hava reached the end</div>
        )}

      {/* Displays all the book results */}
      {!searchBooksLoading &&
        !searchBooksError &&
        searchBooks &&
        searchBooks.length > 0 && (
          <div className="flex flex-col items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="self-start text-2xl font-bold text-gray-900 mb-6">
              All Books
            </h2>
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
              {searchBooks.map((book) => (
                <EachBookGrid key={book.bookId} book={book} />
              ))}
            </div>
          </div>
        )}

      {/* Pagination button  */}
      <div className="flex flex-row justify-center items-center gap-5 mt-auto">
        {/* Prev button */}
        <div>
          <Button
            variant="outline"
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 0}
          >
            Prev
          </Button>
        </div>
        {/* Next button */}
        <div>
          <Button
            variant="outline"
            disabled={(searchBooks?.length as number) < BOOK_LIMIT_PER_PAGE}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
