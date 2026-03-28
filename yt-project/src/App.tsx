import { useState } from "react";
import "./App.css";
import { useDebounce } from "./hooks/useDebounce";
import Input from "./components/Input";
import { VideoGrid } from "./components/VideoGrid";
import { useYouTubeFetch } from "./hooks/useYouTubeFetch";

const DEFAULT_QUERIES = [
  "low quality meme",
  "funny cats",
  "react ts",
  "pablo escobar",
];

const DEFAULT_QUERY =
  DEFAULT_QUERIES[Math.floor(Math.random() * DEFAULT_QUERIES.length)];

function App() {
  const [inputValue, setInputValue] = useState("");
  const debouncedQuery = useDebounce(inputValue, 500);
  const activeQuery = debouncedQuery.trim() || DEFAULT_QUERY;

  const { data, isLoading, error } = useYouTubeFetch(activeQuery);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] px-4 py-6 max-w-4xl mx-auto">
      <Input value={inputValue} onChange={handleInputChange} />

      {error && (
        <p className="bg-red-900/40 border border-red-700 rounded-xl text-red-400 text-sm px-4 py-3">
          Помилка: {error}
        </p>
      )}
      {isLoading && (
        <p className="text-center text-[#717171] text-sm py-8">
          Завантаження...
        </p>
      )}
      {!isLoading && !error && <VideoGrid items={data} />}
    </div>
  );
}

export default App;
