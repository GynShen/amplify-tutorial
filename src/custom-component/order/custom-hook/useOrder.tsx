import axios from "axios";
import React from "react";
import useSWR, { useSWRConfig } from "swr";
import { ReturnOrderType } from "../types/order-types";

const API_URL = import.meta.env.VITE_BACKEND_URL;

type UseOrderProps = {
  userId: number | null;
};

type PlaceOrderType = {
  user: {
    userId: number;
  };
  book: {
    bookId: number;
  };
  cartId: number;
  cartQuantity: number;
};

const fetchOrder = async (url: string) => {
  try {
    const response = await axios.get(url);
    if (response.data.code === 1) {
      return response.data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export default function useOrder({ userId }: UseOrderProps) {
  const {
    data: orders,
    isLoading: orderLoading,
    error: orderError,
  } = useSWR<ReturnOrderType[]>(
    !userId ? null : `${API_URL}/orders?userId=${userId}`,
    fetchOrder
  );
  const { mutate } = useSWRConfig();

  const placeOrder = async (orderToPlace: PlaceOrderType[]) => {
    try {
      const response = await axios.post(`${API_URL}/carts/placeorder`, [
        ...orderToPlace,
      ]);
      if (response.data.code === 1) {
        mutate(`${API_URL}/carts?userId=${userId}`);
        return;
      }
      throw Error("Error placing order. Please try again later");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return {
    orders,
    orderLoading,
    orderError,
    placeOrder,
  };
}
