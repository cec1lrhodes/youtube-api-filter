export interface YouTube {
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
