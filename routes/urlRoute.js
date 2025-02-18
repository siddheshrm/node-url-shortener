const express = require("express");
const router = express.Router();

const {
  generateShortURL,
  getAnalytics,
  redirectToURL,
} = require("../controllers/urlController");

router.post("/", generateShortURL);

router.get("/:shortId", redirectToURL);

router.get("/analytics/:shortId", getAnalytics);

module.exports = router;
