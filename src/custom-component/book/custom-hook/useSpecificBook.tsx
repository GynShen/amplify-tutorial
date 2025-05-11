import useSWR from "swr";
import axios from "axios";
import { BookReturnType } from "../types/book-types";

const API_URL = import.meta.env.VITE_BACKEND_URL;

type UseSpecificBookProps = {
  id: number;
};

const fetchBook = async (url: string) => {
  try {
    const response = await axios.get(url);
    if (response.data.code === 1 && response.data.msg === "success") {
      return response.data.data;
    }
    throw Error("Error fetching the specific book");
  } catch (error) {
    console.error(error);
  }
};

function useSpecificBook({ id }: UseSpecificBookProps) {
  const { data, isLoading, error } = useSWR<BookReturnType>(
    `${API_URL}/books/${id}`,
    fetchBook
  );

  return {
    specificBook: data,
    specificBookLoading: isLoading,
    specificBookError: error,
  };
}

export default useSpecificBook;
