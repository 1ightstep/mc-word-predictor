const express = require("express");
const router = express.Router();
const { healthCheck } = require("../controllers/health.controllers");

router.get("/", healthCheck);

module.exports = router;
