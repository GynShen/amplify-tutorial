import { useEffect, useState } from "react";
import useCart from "./custom-hook/useCart";
import EachCartItem from "./EachCartItem";
import CartSkeleton from "./skeleton/CartSkeleton";
import { Button } from "@/components/ui/button";
import PlaceOrderDialog from "./PlaceOrderDialog";
import { useLocalStorage } from "@uidotdev/usehooks";

// Dummy cart data
const initialCartItems = [
  {
    cartId: 1,
    bookId: 1,
    bookTitle: "Atomic Habits",
    bookQuantity: 1,
    title: "Atomic Habits",
    image: "https://via.placeholder.com/100x150?text=Book+1",
    stockQuantity: 2,
  },
  {
    cartId: 1,
    bookId: 1,
    title: "The Pragmatic Programmer",
    bookQuantity: 2,
    image: "https://via.placeholder.com/100x150?text=Book+2",
    stockQuantity: 1,
  },
];

export default function CartPage() {
  const [userId, _] = useLocalStorage<number | null>("userId", null);
  const {
    cartItems,
    cartItemsLoading,
    cartItemsError,
    updateCartQuantity,
    removeFromCart,
  } = useCart({
    userId: userId,
  });

  const [checkedBook, setCheckedBook] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [openPlaceOrderDialog, setOpenPlaceOrderDialog] =
    useState<boolean>(false);

  if (cartItemsLoading) {
    return <CartSkeleton />;
  }

  if (cartItemsError) {
    return <div className="m-20 mt-30">Error loading carts</div>;
  }

  if (!cartItemsLoading && cartItems?.length === 0) {
    return (
      <div className="m-20 mt-30">
        You have not added any books into your cart yet...
      </div>
    );
  }

  // Handle quantity incremen
  if (
    !cartItemsError &&
    !cartItemsLoading &&
    cartItems &&
    cartItems?.length > 0
  ) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Your Cart
        </h2>

        <div className="max-w-3xl mx-auto space-y-6 mb-20">
          {cartItems &&
            cartItems.map((item) => (
              <EachCartItem
                key={item.cartId}
                item={item}
                updateCartQuantity={updateCartQuantity}
                removeFromCart={removeFromCart}
                checkedBook={checkedBook}
                setCheckedBook={setCheckedBook}
                setTotalPrice={setTotalPrice}
              />
            ))}
        </div>
        <div className="max-w-3xl mx-auto mt-8 fixed bottom-5 left-0.5 right-0.5">
          <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 border">
            <div>
              <span className="text-lg font-medium text-gray-700">
                Total Price:
              </span>
              <span className="text-xl font-bold text-gray-600 ml-2">
                RM {totalPrice.toFixed(2)}
              </span>
            </div>
            <PlaceOrderDialog
              onOpenChange={setOpenPlaceOrderDialog}
              open={openPlaceOrderDialog}
              btnClassName="bg-gray-400 text-white hover:bg-gray-300"
              totalPrice={totalPrice}
              disabled={checkedBook.length === 0}
              checkedBook={checkedBook}
            />
          </div>
        </div>
      </div>
    );
  }
}
