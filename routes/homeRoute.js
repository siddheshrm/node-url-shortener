const express = require("express");
const URLData = require("../models/urlModel");

const { authenticateUser } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authenticateUser, async (request, response) => {
  const userId = request.user.userId;
  const allURLs = await URLData.find({ createdBy: userId });

  return response.render("homeView", {
    urls: allURLs,
  });
});

router.get("/admin", authenticateUser, async (request, response) => {
  if (request.user.role !== "admin") {
    return response.status(403).send("Access denied. Admins only.");
  }

  // Fetch all URLs and populate the `createdBy` field with user details
  const allURLs = await URLData.find({}).populate("createdBy", "name");

  return response.render("adminDashboard", {
    urls: allURLs,
    // Send user data to EJS
    user: request.user,
  });
});

router.post("/delete/:id", authenticateUser, async (request, response) => {
  if (request.user.role !== "admin") {
    return response.status(403).json({ error: "Access denied. Admins only." });
  }

  const { id } = request.params;
  if (!id) {
    return response.status(400).json({ message: "ID is required." });
  }

  const deletedUrl = await URLData.findByIdAndDelete(id);
  if (!deletedUrl) {
    return response.status(404).json({ message: "URL not found." });
  }

  // Handle API and browser differently
  if (
    request.headers.accept &&
    request.headers.accept.includes("application/json")
  ) {
    return response.json({ message: "URL deleted successfully." });
  }

  return response.redirect("/admin");
});

router.get("/signup", (request, response) => {
  return response.render("userView");
});

router.get("/login", (request, response) => {
  return response.render("loginView");
});

module.exports = router;
