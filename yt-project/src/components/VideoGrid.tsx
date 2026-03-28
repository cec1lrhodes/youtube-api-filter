import { useYouTubeFetch } from "../hooks/useYouTubeFetch";

interface VideoGridProps {
  query: string;
}

export const VideoGrid = ({ query }: VideoGridProps) => {
  const { data, isLoading, error } = useYouTubeFetch(
    query || "low quality meme",
  );

  if (error)
    return (
      <p className="bg-red-900/40 border border-red-700 rounded-xl text-red-400 text-sm px-4 py-3">
        Помилка: {error}
      </p>
    );

  if (isLoading)
    return (
      <p className="text-center text-[#717171] text-sm py-8">Завантаження...</p>
    );

  return (
    <div className="flex flex-col gap-5">
      {data.map((item) => (
        <div key={item.id.videoId} className="flex gap-4 group" role="listitem">
          <a
            href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            <img
              src={item.snippet.thumbnails.medium.url}
              alt={item.snippet.title}
              className="w-72 h-[162px] rounded-xl object-cover"
            />
          </a>

          <div className="flex flex-col flex-1 min-w-0 pr-2">
            <a
              href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-base font-semibold line-clamp-2 leading-snug hover:text-white/80 transition-colors"
            >
              {item.snippet.title}
            </a>

            <p className="text-[#aaa] text-xs mt-1 truncate">
              {item.snippet.channelTitle}
            </p>

            <p className="text-[#717171] text-xs mt-1 line-clamp-2 leading-relaxed">
              {item.snippet.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
