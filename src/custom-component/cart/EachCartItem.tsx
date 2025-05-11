import React, { SetStateAction, useState } from "react";
import { CartReturnType } from "./types/cart-types";
import { Button } from "@/components/ui/button";
import { debounce } from "ts-debounce";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { KeyedMutator } from "swr";
import { Link } from "react-router";

type EachCartItemProps = {
  item: CartReturnType;
  updateCartQuantity: (
    cartId: number,
    userId: number,
    bookId: number,
    newQuantity: number
  ) => void;
  removeFromCart: (cartId: number) => void;
  checkedBook: number[];
  setCheckedBook: React.Dispatch<SetStateAction<number[]>>;
  setTotalPrice: React.Dispatch<SetStateAction<number>>;
};

export default function EachCartItem({
  item,
  updateCartQuantity,
  removeFromCart,
  checkedBook,
  setCheckedBook,
  setTotalPrice,
}: EachCartItemProps) {
  const [selectedQuantity, setSelectedQuantity] = useState<number>(
    item.bookQuantity
  );

  // Handle quantity increment
  const incrementQuantity = debounce(updateCartQuantity, 500);

  // Handle quantity decrement
  const decrementQuantity = debounce(updateCartQuantity, 500);

  // Handle check item to checklout
  const handleChecked = () => {
    const itemIsChecked = checkedBook.find((cartId) => cartId === item.cartId);

    if (itemIsChecked) {
      setCheckedBook((prev) => {
        return prev.filter((cartId) => cartId !== item.cartId);
      });
      setTotalPrice((prev) => prev - selectedQuantity * Number(item.bookPrice));
    } else {
      setCheckedBook((prev) => {
        return [...prev, item.cartId];
      });
      setTotalPrice((prev) => prev + selectedQuantity * Number(item.bookPrice));
    }
  };

  // Handle item removal from cart
  const removeCartItem = async (cartId: number) => {
    try {
      await removeFromCart(cartId);
      toast("Success", {
        description: "Successfully removed the book from your cart",
      });
    } catch (error) {
      toast("Error", {
        description:
          "Error removing the book from your cart. Please try again later",
      });
    }
  };

  return (
    <div
      key={item.cartId}
      className="flex items-center bg-white rounded-lg shadow-lg p-4 max-w-2xl"
    >
      <Checkbox className="mr-5 w-5 h-5" onCheckedChange={handleChecked} />
      {/* Image Section */}
      <div className="max-w-[150px] flex justify-center md:justify-start mx-auto">
        <div className="aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 w-full">
          <Link
            to={`/book/${item.bookId}`}
            className="hover:opacity-60 transition-opacity duration-200"
          >
            <img
              src={item.bookImage}
              alt={item.bookTitle}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/300x400?text=No+Cover";
              }}
            />
          </Link>
        </div>
      </div>

      {/* Quantity, Remove and Price section */}
      <div className="ml-6 flex-1">
        <h3 className="text-lg font-medium text-gray-800">{item.bookTitle}</h3>
        <p className="mt-2 text-sm text-gray-600">
          Quantity: <span className="font-semibold">{selectedQuantity}</span>
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Unit Price: <span className="font-semibold">RM{item.bookPrice}</span>
        </p>
        <div className="mt-4 flex items-center justify-between gap-6">
          {/* Increment & Decrement Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={() => {
                const newQuantity = selectedQuantity - 1;
                // Decrement the price if the book is checked
                const itemIsChecked = checkedBook.find(
                  (cartId) => cartId === item.cartId
                );
                if (itemIsChecked) {
                  setTotalPrice((prev) => prev - Number(item.bookPrice));
                }
                setSelectedQuantity(newQuantity);
                decrementQuantity(
                  item.cartId,
                  item.userId,
                  item.bookId,
                  newQuantity
                );
              }}
              className="bg-gray-500 rounded-full hover:bg-gray-300"
              disabled={selectedQuantity <= 1}
              variant="default"
              size="icon"
            >
              -
            </Button>
            <Button
              onClick={() => {
                const newQuantity = selectedQuantity + 1;
                // Increment the price if the book is checked
                const itemIsChecked = checkedBook.find(
                  (cartId) => cartId === item.cartId
                );
                if (itemIsChecked) {
                  setTotalPrice((prev) => prev + Number(item.bookPrice));
                }
                setSelectedQuantity(newQuantity);
                incrementQuantity(
                  item.cartId,
                  item.userId,
                  item.bookId,
                  newQuantity
                );
              }}
              className="bg-gray-500 rounded-full hover:bg-gray-300"
              disabled={selectedQuantity >= item.stockQuantity}
              variant="default"
              size="icon"
            >
              +
            </Button>
          </div>
          {/* Remove Button */}
          <Button
            onClick={() => removeCartItem(item.cartId)}
            className="hover:opacity-60 rounded-3xl font-bold"
            variant="destructive"
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
