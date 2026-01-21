class YoutubeService {
  async search(query) {
    const apiKey = process.env.YOUTUBE_API_KEY;

    const url =
      "https://www.googleapis.com/youtube/v3/search" +
      `?part=snippet&type=video&maxResults=5&q=${encodeURIComponent(query)}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.items || !Array.isArray(data.items)) {
      console.error("YouTube API error:", data);
      return [];
    }

    return data.items.map(item => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
    }));
  }
}

module.exports = new YoutubeService();
