import { CartStatusType } from "@/custom-component/cart/types/cart-types";

export type ReturnOrderType = {
  orderId: string;
  cartId: number;
  userId: number;
  bookId: number;
  bookTitle: string;
  bookImage: string;
  bookPrice: string;
  cartStatus: CartStatusType;
  cartQuantity: number;
  createTime: string;
  updateTime: string;
};
