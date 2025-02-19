const express = require("express");
const URLData = require("../models/urlModel");

const router = express.Router();

router.get("/", async (request, response) => {
  const allURLs = await URLData.find({});

  return response.render("homeView", {
    urls: allURLs,
  });
});

module.exports = router;
