import { memo } from "react";
import type { YouTube } from "../types/YouTube";

interface VideoGridProps {
  items: YouTube[];
}

export const VideoGrid = memo(({ items }: VideoGridProps) => {
  return (
    <div className="flex flex-col gap-5">
      {items.map((item) => (
        <div key={item.id.videoId} className="flex gap-4 group" role="listitem">
          <a
            href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            <img
              src={item.snippet.thumbnails.medium?.url}
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
});

VideoGrid.displayName = "VideoGrid";
