const express = require("express");
const router = express.Router();

// Test route först - ingen controller
router.get("/", (req, res) => {
  res.json({ message: "Menu route works!" });
});

module.exports = router;
