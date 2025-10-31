const User = require("../models/User");

// Add to favorites
exports.addFavorite = async (req, res) => {
  try {
    const { menuItemId } = req.body;
    const user = await User.findById(req.user._id);

    if (user.favorites.includes(menuItemId)) {
      return res.status(400).json({ error: "Already in favorites" });
    }

    user.favorites.push(menuItemId);
    await user.save();

    res.json(user.favorites);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remove from favorites
exports.removeFavorite = async (req, res) => {
  try {
    const { menuItemId } = req.params;
    const user = await User.findById(req.user._id);

    user.favorites = user.favorites.filter(
      (fav) => fav.toString() !== menuItemId
    );
    await user.save();

    res.json(user.favorites);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get favorites
exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("favorites");
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
