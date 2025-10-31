const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

// Get all menu items - direkt i routen istället för controller
router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ available: true });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get menu items by category
router.get("/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const menuItems = await MenuItem.find({ category, available: true });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get single menu item
router.get("/:id", async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Create menu item
router.post("/", async (req, res) => {
  try {
    const menuItem = new MenuItem(req.body);
    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
