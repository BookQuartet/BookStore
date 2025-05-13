import { useEffect, useState } from "react";
import axios from "axios";
import type { Book, BookApiResponse } from "../types/bookType";

function useFetch(url: string) {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [skeletonCount, setSkeletonCount] = useState(20);

  const fetchData = async () => {
    try {
      const response = await axios.get<BookApiResponse>(url);

      if (response.data && Array.isArray(response.data.books)) {
        setBooks(response.data.books);
        setSkeletonCount(response.data.books.length || 8);
      } else {
        setBooks([]);
        setSkeletonCount(0);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setBooks([]);
      setSkeletonCount(0);
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
