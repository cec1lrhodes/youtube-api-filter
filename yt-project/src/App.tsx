import { useEffect, useState } from "react";
import "./App.css";

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
  console.log("Всі змінні:", import.meta.env);
  const [data, setData] = useState<YouTube[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const [inputValue, setInputValue] = useState("");

  const filteredInputSearch = data.filter((item) =>
    item.snippet.title.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const youtubeFetch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=react&type=video&maxResults=30&key=${API_KEY}`,
      );
      if (!res.ok) throw new Error("Помилка при запиту");
      const json = await res.json();
      setData(json.items);
      console.log(json);
    } catch (err: any) {
      // заглушка any
      setError(err.message);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    youtubeFetch();
  }, []);

  if (isLoading)
    return <p className="bg-white rounded-2xl text-black">Loading...</p>;

  if (error)
    return (
      <p className="bg-red-500 rounded-2xl text-white">Error... {error}</p>
    );

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <input
        className="w-full border rounded p-2 mb-4 bg-white text-black font-semibold"
        placeholder="search..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      {filteredInputSearch.map((item) => (
        <div
          key={item.id.videoId}
          className="flex gap-3 border rounded-xl p-3 shadow-sm"
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
