const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const controller = require("../controllers/favoriteController");

router.get("/favorites", requireAuth, (req, res) =>
  controller.showFavorites(req, res)
);

router.post("/favorites/add", requireAuth, (req, res) =>
  controller.addFavorite(req, res)
);

router.post("/favorites/delete/:id", requireAuth, (req, res) =>
  controller.removeFavorite(req, res)
);

module.exports = router;

router.post("/favorites/search", requireAuth, (req, res) =>
  controller.search(req, res)
);
