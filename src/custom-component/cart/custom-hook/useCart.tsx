import useSWR from "swr";
import axios from "axios";
import { useSWRConfig } from "swr";
import { CartReturnType } from "../types/cart-types";

const API_URL = import.meta.env.VITE_BACKEND_URL;

type UseCartProps = {
  userId: number | null;
};

const fetchCart = async (url: string) => {
  try {
    const response = await axios.get(url);
    if (response.data.code === 1 && response.data.msg === "success") {
      return response.data.data;
    }
    throw Error("Error fetching books");
  } catch (error) {
    console.error(error);
  }
};

function useCart({ userId }: UseCartProps) {
  const { mutate } = useSWRConfig();
  const {
    data,
    isLoading,
    error,
    mutate: cartMutate,
  } = useSWR<CartReturnType[]>(
    !userId ? null : `${API_URL}/carts?userId=${userId}`,
    fetchCart
  );

  const updateCartQuantity = async (
    cartId: number,
    userId: number,
    bookId: number,
    newQuantity: number
  ) => {
    try {
      const response = await axios.put(`${API_URL}/carts`, {
        user: {
          userId,
        },
        book: {
          bookId,
        },
        cartId,
        bookQuantity: newQuantity,
      });

      if (response.data.code === 1) {
        mutate(`${API_URL}/carts?userId=${userId}`);
        return;
      }

      throw new Error("Error updating quantity");
    } catch (error) {
      console.log("Error updating quantity " + error);
      throw error;
    }
  };

  const removeFromCart = async (cartId: number) => {
    try {
      const response = await axios.delete(`${API_URL}/carts?cartId=${cartId}`);

      if (response.data.code === 1) {
        mutate(`${API_URL}/carts?userId=${userId}`);
        return;
      }

      throw Error("Failed removing from cart");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const addToCart = async (
    bookId: number,
    userId: number,
    quantity: number
  ) => {
    try {
      const response = await axios.post(`${API_URL}/books/addtocart`, {
        book: {
          bookId,
        },
        user: {
          userId,
        },
        bookQuantity: quantity,
      });

      if (response.data.code === 1) {
        mutate(`${API_URL}/carts?userId=${userId}`);
        return;
      }

      throw Error("Failed adding to cart");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return {
    cartItems: data,
    cartItemsLoading: isLoading,
    cartItemsError: error,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    cartMutate,
  };
}

export default useCart;
