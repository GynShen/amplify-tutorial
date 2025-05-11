import { Category } from "@/custom-component/category/types/category-type";

export type AddNewBookType = Omit<BookReturnType, "bookId">;
export type BookReturnType = {
  bookId: number;
  bookTitle: string;
  bookPublicationDate: string;
  bookDescription: string;
  bookAuthor: string;
  bookPrice: string;
  bookImage: string;
  stockQuantity: number;
  bookCategory: Category;
};
