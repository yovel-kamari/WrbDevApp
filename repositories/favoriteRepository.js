const db = require("../config/db");
const Favorite = require("../models/Favorite");

class FavoriteRepository {
  findByUserId(userId) {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT * FROM Favorites WHERE userId = ? ORDER BY createdAt DESC",
        [userId],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows.map(row => new Favorite(row)));
        }
      );
    });
  }

  findByVideoId(userId, videoId) {
    return new Promise((resolve, reject) => {
      db.get(
        "SELECT * FROM Favorites WHERE userId = ? AND videoId = ?",
        [userId, videoId],
        (err, row) => {
          if (err) return reject(err);
          resolve(row ? new Favorite(row) : null);
        }
      );
    });
  }

  create(favorite) {
    return new Promise((resolve, reject) => {
      db.run(
        `
        INSERT INTO Favorites (userId, videoId, title, thumbnail, createdAt)
        VALUES (?, ?, ?, ?, ?)
        `,
        [
          favorite.userId,
          favorite.videoId,
          favorite.title,
          favorite.thumbnail,
          favorite.createdAt,
        ],
        function (err) {
          if (err) return reject(err);
          resolve(
            new Favorite({
              id: this.lastID,
              ...favorite,
            })
          );
        }
      );
    });
  }

  delete(id, userId) {
    return new Promise((resolve, reject) => {
      db.run(
        "DELETE FROM Favorites WHERE id = ? AND userId = ?",
        [id, userId],
        function (err) {
          if (err) return reject(err);
          resolve(this.changes > 0);
        }
      );
    });
  }
}

module.exports = new FavoriteRepository();
