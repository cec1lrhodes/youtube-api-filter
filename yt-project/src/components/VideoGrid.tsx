import { useYouTubeFetch } from "../hooks/useYouTubeFetch";

interface VideoGridProps {
  query: string;
}

export const VideoGrid = ({ query }: VideoGridProps) => {
  const { data, isLoading, error } = useYouTubeFetch(
    query || "low quality video",
  );

  if (error)
    return <p className="bg-red-500 rounded-2xl text-white">Error: {error}</p>;
  if (isLoading) return <p className="text-center mb-4">Loading...</p>;

  return (
    <div>
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
};
