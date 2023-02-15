import { useState } from "react";
import useThrottledSearch from "./hooks/useThrottledSearch";
import "./App.css";
import List from "./List";

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { result, isLoading, search, nextPage, prevPage, page } = useThrottledSearch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    search(searchQuery);
  };

  return (
    <div className="container">
      <h1>Github Repo Search by Ali Hayder</h1>
      <form onSubmit={handleSearch} className="search-container">
        <input className="search-input" placeholder="Type here" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button className="search-button" type="submit" disabled={isLoading}>
          Search
        </button>
      </form>
      {isLoading && <p>Loading...</p>}
      <div className="result-container">
        {result?.items?.length > 0 && (
          <p>
            Showing page {page} of {result?.items?.length} results ({result?.total_count} total)
          </p>
        )}
        <List repos={result?.items} page={page} />
        {result?.items?.length === 30 && (
          <div>
            <button onClick={prevPage} disabled={page === 1}>
              Previous Page
            </button>
            <span>Page {page}</span>
            <button onClick={nextPage} disabled={result?.items?.length < 30}>
              Next Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
