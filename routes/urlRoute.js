const express = require("express");
const router = express.Router();

const {
  generateShortURL,
  getAnalytics,
  redirectToURL,
} = require("../controllers/urlController");

const { authenticateUser } = require("../middlewares/authMiddleware");

router.post("/", authenticateUser, generateShortURL);

router.get("/:shortId", redirectToURL);

router.get("/analytics/:shortId", getAnalytics);

module.exports = router;
