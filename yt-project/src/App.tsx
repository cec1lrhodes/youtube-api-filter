import { useEffect, useState } from "react";
import "./App.css";
import { useDebounce } from "./hooks/useDebounce";
import Input from "./components/Input";
import { useYouTubeFetch } from "./hooks/useYouTubeFetch";

function App() {
  const [inputValue, setInputValue] = useState("");

  const debouncedQuery = useDebounce(inputValue, 500);

  const { data, error, isLoading } = useYouTubeFetch(
    debouncedQuery || "low quality memes",
  );

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  if (error)
    return <p className="bg-red-500 rounded-2xl text-white">Error: {error}</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Input value={inputValue} onChange={handleInputChange} />

      {isLoading && <p className="text-center mb-4">Loading...</p>}

      {data.map((item) => (
        <div
          key={item.id.videoId}
          className="flex gap-3 border rounded-xl p-3 shadow-sm mb-3"
        >
          <img
            src={item.snippet.thumbnails.medium.url}
            alt={item.snippet.title}
            className="w-40 rounded-lg object-cover"
          />
          <div>
            <h2 className="font-bold text-base">{item.snippet.title}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {item.snippet.channelTitle}
            </p>
            <p className="text-sm mt-1 line-clamp-2">
              {item.snippet.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
