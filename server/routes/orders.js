const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const auth = require("../middleware/auth");

// Create new order (UTAN auth - för att tillåta gästbeställningar)
router.post("/", orderController.createOrder);

// Get user's orders (MED auth - kräver inloggning)
router.get("/my-orders", auth, orderController.getUserOrders);

// Get single order (UTAN auth för gäster)
router.get("/:id", orderController.getOrder);

// Get all orders (optional - för admin)
router.get("/", orderController.getAllOrders);

module.exports = router;
