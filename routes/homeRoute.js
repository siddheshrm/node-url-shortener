const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
  return response.render("homeView");
});

module.exports = router;
