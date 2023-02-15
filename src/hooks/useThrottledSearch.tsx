import { useState, useEffect } from "react";

type SearchResult = {
  id: number;
  name: string;
  html_url: string;
  description: string;
}

type SearchResponse = {
  items: SearchResult[];
  total_count: number;
}

const THROTTLE_INTERVEL = 500;

const useThrottledSearch = () => {
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<SearchResult[]>([]);
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
      const response = await fetch(`https://api.github.com/search/repositories?q=${searchQuery}&page=${pageNum}`);
      const data: SearchResponse = await response.json();

      setResults(data.items);
      setTotalPages(Math.ceil(data.total_count / 30));
    } catch (error) {
      console.error("Error fetching search results:", error);
    }

    setIsLoading(false);
  };

  const throttledSearch = (searchQuery: string, pageNum: number) => {
    setTimeout(() => {
      doSearch(searchQuery, pageNum);
    }, THROTTLE_INTERVEL);
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

  return { results, isLoading, search, nextPage, prevPage, page };
};

export default useThrottledSearch;
