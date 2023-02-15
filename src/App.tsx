import { useState } from "react";
import useThrottledSearch from "./hooks/useThrottledSearch";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { results, isLoading, search, nextPage, prevPage, page } = useThrottledSearch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    search(searchQuery);
  };

  return (
    <div className="container">
      <h1>Github Repository Search by Ali Hayder</h1>
      <form onSubmit={handleSearch} className="search-container">
        <input className="search-input" placeholder="Search here" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button className="search-button" type="submit" disabled={isLoading}>
          Search
        </button>
      </form>
      {isLoading && <p>Loading...</p>}
      <div className="result-container">
        {results.length > 0 && (
          <p>
            Showing page {page} of {results.length} results ({results.length} total)
          </p>
        )}

        <ul className="result-list">
          {results.map((result, i) => (
            <li className="result-item" key={result.id}>
              <a href={result.html_url}>{`${i + 1}. ${result.name}`}</a>
              <p>{result.description}</p>
            </li>
          ))}
        </ul>
        {results.length === 30 && (
          <div>
            <button onClick={prevPage} disabled={page === 1}>
              Previous Page
            </button>
            <span>Page {page}</span>
            <button onClick={nextPage} disabled={results.length < 30}>
              Next Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
