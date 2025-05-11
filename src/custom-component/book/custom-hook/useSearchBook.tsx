import useSWR from "swr";
import axios from "axios";
import { BookReturnType } from "../types/book-types";

const API_URL = import.meta.env.VITE_BACKEND_URL;

type UseSearchBookProps = {
  query: string;
  page: number;
  pageLimit: number;
};

const fetchBook = async (url: string) => {
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

function useSearchBook({ query, page, pageLimit }: UseSearchBookProps) {
  const { data, isLoading, error } = useSWR<BookReturnType[]>(
    `${API_URL}/books?searchCriteria=${query}&page=${page}&pageLimit=${pageLimit}`,
    fetchBook
  );

  return {
    searchBooks: data,
    searchBooksLoading: isLoading,
    searchBooksError: error,
  };
}

export default useSearchBook;
