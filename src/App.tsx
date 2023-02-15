import { useState } from "react";
import useThrottledSearch from "./hooks/useThrottledSearch";
import './App.css'

function App() {
  const [query, setQuery] = useState<string>("");
  const { results, isLoading, search, nextPage, prevPage, page } = useThrottledSearch();

  const handleSearch = async () => {
    await search(query);
  };

  return (
    <div className="container">
      <h1>Github Repository Search by Ali Hayder</h1>
      <div className="search-container">
        <input className="search-input" placeholder="Search here" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button className="search-button" onClick={handleSearch} disabled={isLoading}>
          Search
        </button>
      </div>
      {isLoading && <p>Loading...</p>}
      <ul className="result-list">
        {results.map((result, i) => (
          <li className="result-item" key={result.id}>
            <a href={result.html_url}>{`${i+1}. ${result.name}`}</a>
            <p>{result.description}</p>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={prevPage} disabled={page === 1}>
          Previous Page
        </button>
        <span>Page {page}</span>
        <button onClick={nextPage} disabled={results.length === 0}>
          Next Page
        </button>
      </div>
    </div>
  );
}

export default App;

