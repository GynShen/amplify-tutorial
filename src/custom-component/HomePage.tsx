import { Link } from "react-router";
import useSearchBook from "./book/custom-hook/useSearchBook";
import EachBookGrid from "./book/EachBookGrid";
import FeaturedBookSkeleton from "./book/skeleton/FeaturedBookSkeleton";

function HomePage() {
  const {
    searchBooks: mysteryBook,
    searchBooksLoading: mysteryBookLoading,
    searchBooksError: mysteryBookError,
  } = useSearchBook({
    query: "Mystery",
    page: 0,
    pageLimit: 4,
  });

  const {
    searchBooks: romanceBooks,
    searchBooksLoading: romanceBooksLoading,
    searchBooksError: romanceBooksError,
  } = useSearchBook({
    query: "Romance",
    page: 0,
    pageLimit: 4,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header section */}
      <div className="relative bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Welcome to BookStore
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
              Discover your next favorite book from our vast collection
            </p>
          </div>
        </div>
      </div>

      {/* Popular Categories */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Popular Categories
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {["Fiction", "Fantasy", "Science Fiction"].map((category, idx) => (
            <Link to={`/search/${category}`} key={idx}>
              <div
                key={category}
                className="group relative rounded-lg border border-gray-200 p-6 hover:border-gray-400"
              >
                <h3 className="text-lg font-medium text-gray-900">
                  {category}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Explore our collection of {category.toLowerCase()} books
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Mystery books */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Mystery books</h2>
        {mysteryBookLoading && <FeaturedBookSkeleton />}
        {mysteryBookError && <div className="text-center">Error</div>}
        {!mysteryBookLoading && !mysteryBookError && mysteryBook && (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
            {mysteryBook.map((book) => (
              <EachBookGrid key={book.bookId} book={book} />
            ))}
          </div>
        )}
      </div>

      {/* Romance books */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Romance books</h2>
        {romanceBooksLoading && <FeaturedBookSkeleton />}
        {romanceBooksError && <div className="text-center">Error</div>}
        {!romanceBooksLoading && !romanceBooksError && romanceBooks && (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
            {romanceBooks.map((book) => (
              <EachBookGrid key={book.bookId} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
