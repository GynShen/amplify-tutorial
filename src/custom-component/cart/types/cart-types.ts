export type AddToCartType = {
  bookId: number;
  userId: string;
  bookQuantity: number;
};

const cartStatus = [
  "ACTIVE",
  "CANCELLED",
  "COMPLETED",
  "ORDERED",
  "PREPARING",
] as const;

export type CartStatusType = (typeof cartStatus)[number];

export type CartReturnType = {
  cartId: number;
  bookId: number;
  bookTitle: string;
  stockQuantity: number;
  userId: number;
  bookQuantity: number;
  createTime: string;
  cartStatus: CartStatusType;
  bookImage: string;
  bookPrice: string;
};
