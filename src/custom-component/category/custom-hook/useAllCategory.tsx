import useSWR from "swr";
import axios from "axios";
import { Category } from "../types/category-type";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const fetchAllCategory = async (url: string) => {
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

function useAllCategory() {
  const { data, isLoading, error } = useSWR<Category[]>(
    `${API_URL}/categorys`,
    fetchAllCategory
  );

  return {
    allCategory: data,
    allCategoryLoading: isLoading,
    allCategoryError: error,
  };
}

export default useAllCategory;
