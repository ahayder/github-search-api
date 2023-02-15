import { SearchResult } from "./types";

type ListProps = {
  repos: SearchResult[];
  page: number;
};

const List = ({ repos, page }: ListProps) => {
  const startIndex = (page - 1) * 30;
  return (
    <>
      <ul className="result-list">
        {repos?.map((result, i) => (
          <li className="result-item" key={result.id}>
            <a href={result.html_url}>{`${startIndex + i + 1}. ${result.name}`}</a>
            <p>{result.description}</p>
          </li>
        ))}
      </ul>
    </>
  );
};
export default List;
