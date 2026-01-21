const favoriteRepository = require("../repositories/favoriteRepository");

class FavoriteService {
  async getUserFavorites(userId) {
    return favoriteRepository.findByUserId(userId);
  }

  async addFavorite({ userId, videoId, title, thumbnail }) {
    const existing = await favoriteRepository.findByVideoId(userId, videoId);
    if (existing) {
      throw new Error("Video already in favorites");
    }

    return favoriteRepository.create({
      userId,
      videoId,
      title,
      thumbnail,
      createdAt: new Date().toISOString(),
    });
  }

  async removeFavorite({ id, userId }) {
    const success = await favoriteRepository.delete(id, userId);
    if (!success) {
      throw new Error("Favorite not found");
    }
  }
}

module.exports = new FavoriteService();
