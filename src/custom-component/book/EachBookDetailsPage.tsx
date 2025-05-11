import { useNavigate, useParams } from "react-router";
import useSpecificBook from "./custom-hook/useSpecificBook";
import BookDetailSkeleton from "./skeleton/BookDetailSkeleton";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import useCart from "../cart/custom-hook/useCart";
import { toast } from "sonner";
import { useLocalStorage } from "@uidotdev/usehooks";

function EachBookDetailsPage() {
  const { id } = useParams();
  const [userId, _] = useLocalStorage<number | null>("userId", null);
  const navigate = useNavigate();
  const { specificBook, specificBookLoading, specificBookError } =
    useSpecificBook({ id: parseInt(id as string) ?? 0 });

  const { addToCart, cartItems, updateCartQuantity } = useCart({
    userId: userId,
  });

  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

  const handleAddToCart = async () => {
    if (!userId) {
      toast("Reminder", {
        description: "Please log in to add to cart",
        action: {
          label: "Log in now",
          onClick: () => navigate("/auth/login"),
        },
      });
      return;
    }
    const currentBookInCart = cartItems?.find(
      (item) => item.bookId === specificBook?.bookId
    );
    console.log(cartItems);

    console.log(currentBookInCart);

    // Current book already in the cart
    if (currentBookInCart && specificBook) {
      const newQuantity = currentBookInCart.bookQuantity + selectedQuantity;

      if (newQuantity > specificBook?.stockQuantity) {
        toast("Exceeded stock quantity", {
          description:
            "The selected quantity together with the same book's quantity in cart has exceeded the stock quantity",
        });
        return;
      } else {
        try {
          await updateCartQuantity(
            currentBookInCart.cartId,
            currentBookInCart.userId,
            currentBookInCart.bookId,
            newQuantity
          );
          toast("Success", {
            description: "Successfully updated the quantity",
          });
        } catch (error) {
          toast("Error", {
            description: "Server error. Please try again later",
          });
        }
      }
    } else {
      // New book
      try {
        await addToCart(specificBook?.bookId ?? 0, userId, selectedQuantity);
        console.log("Success");
        toast("Success", {
          description: "Succesfully added the book into your cart",
        });
      } catch (error) {
        toast("Error", {
          description: "Server error. Please try again later",
        });
      }
    }
  };

  if (specificBookLoading) {
    return <BookDetailSkeleton />;
  }

  if (specificBookError) {
    return <div>Error loading book details</div>;
  }

  if (!specificBook) {
    return <div>Book not found</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image cover container */}
        <div className="w-full md:w-1/3 max-w-[350px] max-h-[700px] flex justify-center md:justify-start mx-auto">
          <div className="aspect-3 overflow-hidden rounded-lg bg-gray-100 w-full md:max-w-80 max-w-60">
            <img
              src={specificBook.bookImage}
              alt={specificBook.bookTitle}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/400x600?text=No+Cover";
              }}
            />
          </div>
        </div>

        <div className="w-full md:w-2/3">
          {/* Book title */}
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
            {specificBook.bookTitle}
          </h1>

          {/* Book author */}
          {specificBook.bookAuthor ? (
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Authors:</h2>
              <div className="flex flex-wrap gap-2">
                <span className="flex items-center rounded-md bg-gray-50 px-2 py-1 text-sm font-medium text-gray-600">
                  {specificBook.bookAuthor}
                </span>
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Authors: Could not found any authors...
              </h2>
            </div>
          )}

          {/* Book description */}
          {specificBook.bookDescription ? (
            <div className="content mb-4 text-gray-900 font-semibold">
              {specificBook.bookDescription}
            </div>
          ) : (
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Description not available
              </h2>
            </div>
          )}

          {/* Book category */}
          {specificBook.bookCategory && (
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Subjects:</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-sm font-medium text-blue-700">
                  {specificBook.bookCategory.categoryName}
                </span>
              </div>
            </div>
          )}

          {/* Publish date */}
          <div className="text-sm text-gray-500">
            <p>
              Published Date:{" "}
              {new Date(
                specificBook.bookPublicationDate
              ).toLocaleDateString() ?? "N/A"}
            </p>
          </div>
          {/* Book price */}
          <div className="text-xl font-semibold mt-5">
            Price: RM{specificBook.bookPrice}
          </div>
          {/* User selected quantity and available stocks */}
          <div className="flex gap-5 items-center mt-5">
            <span>Quantity:</span>
            <div className="flex gap-2 items-center">
              <Button
                variant="default"
                className="bg-gray-500 rounded-full hover:bg-gray-300"
                size="icon"
                disabled={selectedQuantity <= 1}
                onClick={() => setSelectedQuantity((prev) => prev - 1)}
              >
                -
              </Button>
              <span>{selectedQuantity}</span>
              <Button
                variant="default"
                className="bg-gray-500 rounded-full hover:bg-gray-300"
                size="icon"
                disabled={selectedQuantity >= specificBook.stockQuantity}
                onClick={() => setSelectedQuantity((prev) => prev + 1)}
              >
                +
              </Button>
            </div>
            <span>{specificBook.stockQuantity} books left</span>
          </div>
          {/* Add to cart btn */}
          <Button
            className="mt-5 w-full md:max-w-[10rem] bg-gray-500 hover:bg-gray-400"
            variant="default"
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EachBookDetailsPage;
