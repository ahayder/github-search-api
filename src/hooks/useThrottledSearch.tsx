import { useState, useEffect } from "react";
import { SearchResult } from "../types";

type SearchResponse = {
  items: SearchResult[];
  total_count: number;
};

const API_URL = "https://api.github.com/search/repositories";
const THROTTLE_DELAY = 500;

const useThrottledSearch = () => {
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<SearchResponse>({} as SearchResponse);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    if (query) {
      throttledSearch(query, page);
    }
  }, [query, page]);

  const search = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const doSearch = async (searchQuery: string, pageNum: number) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}?q=${searchQuery}&page=${pageNum}`);
      const data: SearchResponse = await response.json();

      setResult(data);
      setTotalPages(Math.ceil(data.total_count / 30));
    } catch (error) {
      console.error("Error fetching search result:", error);
    }

    setIsLoading(false);
  };

  // throttle implementation
  const throttledSearch = (searchQuery: string, pageNum: number) => {
    let timer = true;
    if(timer){
      timer = false;
      doSearch(searchQuery, pageNum);
      setTimeout(() => {
        timer = true;
      }, THROTTLE_DELAY)
    }
  };

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      throttledSearch(query, page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      throttledSearch(query, page - 1);
    }
  };

  return { result, isLoading, search, nextPage, prevPage, page };
};

export default useThrottledSearch;
