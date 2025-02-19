const shortid = require("shortid");
const URLData = require("../models/urlModel");

// Generates a short URL from a long URL, saves it in the database, and returns the short ID.
async function generateShortURL(request, response) {
  const body = request.body;

  if (!body.url) {
    return response.status(400).json({ error: "URL is required" });
  }

  // Normalize the URL: trim spaces and remove trailing slashes
  let url = body.url.trim().replace(/\/+$/, "");

  // Check if the URL already exists in the database
  let existingURL = await URLData.findOne({ redirectURL: url });

  if (!existingURL) {
    // Create a new shortID if URL does not exist
    const shortID = shortid.generate();

    existingURL = await URLData.create({
      shortID: shortID,
      redirectURL: url,
      visitHistory: [],
    });
  }

  // Fetch all stored URLs to show the complete list
  const allURLs = await URLData.find({});

  // Render homeView with both the new URL and the full list
  return response.render("homeView", {
    id: existingURL.shortID || null,
    originalURL: existingURL.redirectURL || null,
    urls: allURLs,
  });
}

// Redirects to the original URL based on the short ID, updates visit history
async function redirectToURL(request, response) {
  const shortId = request.params.shortId;

  const entry = await URLData.findOneAndUpdate(
    { shortID: shortId },
    {
      $push: {
        visitHistory: {
          timestamp: new Date(),
        },
      },
    },
    { new: true } // Ensures we get the updated document
  );

  if (!entry) {
    return response.status(404).json({ error: "Short URL not found" });
  }

  response.redirect(entry.redirectURL);
}

// Retrieves analytics for the given short URL, including total clicks and visit history.
async function getAnalytics(request, response) {
  const shortId = request.params.shortId;

  const result = await URLData.findOne({ shortID: shortId });

  if (!result) {
    return response.status(404).json({ error: "Short URL not found" });
  }

  return response.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = { generateShortURL, redirectToURL, getAnalytics };
