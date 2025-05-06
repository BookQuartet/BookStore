import { useEffect, useState } from "react";
import axios from "axios";
import type { Book, BookApiResponse } from "../types/bookType";

function useFetch(url: string) {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [skeletonCount, setSkeletonCount] = useState(20);

  const fetchData = async () => {
    try {
      const response = await axios.get<BookApiResponse>(url);
      setBooks(response.data.books);
      setSkeletonCount(response.data.books.length);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setTimeout(() => setIsLoading(false), 2000);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { books, isLoading, skeletonCount };
}

export default useFetch;