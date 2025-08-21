const express = require("express");
const router = express.Router();
const claimController = require("../controllers/claimController");

// POST /api/claim/:userId
router.post("/claim/:userId", claimController.claimPoints);

module.exports = router;
