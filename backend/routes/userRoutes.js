const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// GET /api/users
router.get("/users", userController.getUsers);

// POST /api/users
router.post("/users", userController.addUser);

// GET /api/history/:userId
router.get("/history/:userId", userController.getHistoryForUser);

module.exports = router;
