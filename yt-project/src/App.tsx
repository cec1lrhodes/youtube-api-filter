import { useEffect, useState } from "react";
import "./App.css";
import { useDebounce } from "./hooks/useDebounce";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

interface YouTube {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    channelTitle: string;
    thumbnails: {
      medium: { url: string };
    };
  };
}

function App() {
  const [data, setData] = useState<YouTube[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [inputValue, setInputValue] = useState("");

  const debouncedQuery = useDebounce(inputValue, 500);

  const youtubeFetch = async (
    query: string = "react",
    signal?: AbortSignal,
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=30&key=${API_KEY}`,
        { signal },
      );
      if (!res.ok) throw new Error("Помилка при запиті");
      const json = await res.json();
      setData(json.items);
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Невідома помилка");
    } finally {
      setIsLoading(false);
    }
  };

  // Початковий запит при першому рендері.
  useEffect(() => {
    youtubeFetch();
  }, []);

  // Запит при зміні debouncedQuery(при друку) -> deboQ змінюється -> new controller ->cont.signal to fetch -> query.
  useEffect(() => {
    if (!debouncedQuery) return;

    const controller = new AbortController();
    youtubeFetch(debouncedQuery, controller.signal);

    return () => {
      controller.abort();
    };
  }, [debouncedQuery]);

  if (error)
    return <p className="bg-red-500 rounded-2xl text-white">Error: {error}</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <input
        className="w-full border rounded p-2 mb-4 bg-white text-black font-semibold"
        placeholder="search..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

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
