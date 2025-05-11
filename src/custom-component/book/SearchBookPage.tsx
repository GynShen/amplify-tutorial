import { useParams } from "react-router";
import useSearchBook from "./custom-hook/useSearchBook";
import EachBookGrid from "./EachBookGrid";
import BookSkeleton from "./skeleton/SearchBookSkeleton";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Button } from "@/components/ui/button";

const BOOK_LIMIT_PER_PAGE = 12;

export default function SearchBookPage() {
  const { query } = useParams();
  const [page, setPage] = useState<number>(0);

  const { searchBooks, searchBooksLoading, searchBooksError } = useSearchBook({
    query: query?.split(" ").join("+").toLowerCase() ?? "",
    page,
    pageLimit: BOOK_LIMIT_PER_PAGE,
  });

  // const handlePageChange = ({ selected }: { selected: number }) => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  //   setPage(selected);
  // };
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
              Results for: {query}
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
      {/* <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageChange}
        pageRangeDisplayed={3}
        pageCount={Math.ceil((totalPage ?? 0) / BOOK_LIMIT_PER_PAGE)}
        previousLabel="Previous"
        renderOnZeroPageCount={null}
        containerClassName="flex justify-center items-center gap-2 mt-4"
        pageClassName="px-3 py-1 border rounded-md cursor-pointer hover:bg-gray-200"
        activeClassName="bg-blue-500 text-white font-bold"
        previousClassName="px-3 py-1 border rounded-md cursor-pointer hover:bg-gray-200"
        nextClassName="px-3 py-1 border rounded-md cursor-pointer hover:bg-gray-200"
        disabledClassName="cursor-not-allowed opacity-50"
      /> */}
    </div>
  );
}
