const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

// All dessa routes kräver autentisering
router.use(auth);

// Get favorites
router.get("/favorites", userController.getFavorites);

// Add to favorites
router.post("/favorites", userController.addFavorite);

// Remove from favorites
router.delete("/favorites/:menuItemId", userController.removeFavorite);

module.exports = router;
