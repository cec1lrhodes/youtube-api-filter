import { useEffect, useState } from "react";
import type { YouTube } from "../types/YouTube";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export const useYouTubeFetch = (query: string) => {
  const [data, setData] = useState<YouTube[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (!API_KEY) {
      throw new Error("VITE_YOUTUBE_API_KEY is not defined in .env");
    }

    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=30&key=${API_KEY}`,
          { signal: controller.signal },
        );
        if (!res.ok) throw new Error("Помилка при запиті");
        const json = await res.json();
        setData(json.items || []);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Невідома помилка");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { data, isLoading, error };
};
