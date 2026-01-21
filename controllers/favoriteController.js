const favoriteService = require("../services/favoriteService");
const youtubeService = require("../services/youtubeService");

class FavoriteController {
  async showFavorites(req, res) {
    const userId = req.session.user.id;
    const favorites = await favoriteService.getUserFavorites(userId);

    res.render("favorites", {
      favorites,
      results: [],
      error: null,
    });
  }

  async search(req, res) {
    const userId = req.session.user.id;
    const { query } = req.body;

    const favorites = await favoriteService.getUserFavorites(userId);
    const results = await youtubeService.search(query);

    res.render("favorites", {
      favorites,
      results,
      error: null,
    });
  }

  async addFavorite(req, res) {
    try {
      const userId = req.session.user.id;
      const { videoId, title, thumbnail } = req.body;

      await favoriteService.addFavorite({
        userId,
        videoId,
        title,
        thumbnail,
      });

      res.redirect("/favorites");
    } catch (err) {
      const favorites = await favoriteService.getUserFavorites(req.session.user.id);

      res.render("favorites", {
        favorites,
        results: [],
        error: err.message,
      });
    }
  }

  async removeFavorite(req, res) {
    const userId = req.session.user.id;
    const { id } = req.params;

    await favoriteService.removeFavorite({ id, userId });
    res.redirect("/favorites");
  }
}

module.exports = new FavoriteController();
