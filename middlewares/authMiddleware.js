require("dotenv").config();
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;

function authenticateUser(request, response, next) {
  // Check token in cookies (for browser requests)
  let token = request.cookies.authToken;

  // If no token in cookies, check Authorization header (for API requests)
  if (!token && request.headers.authorization) {
    const authHeader = request.headers.authorization;
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
    }
  }

  // If no token found, handle responses for both API and browser
  if (!token) {
    if (
      request.headers.accept &&
      request.headers.accept.includes("application/json")
    ) {
      return response
        .status(401)
        .json({ error: "Unauthorized: No token provided" });
    }
    return response.redirect("/login"); // Redirect for browser requests
  }

  try {
    // Verify token
    const decodedToken = jwt.verify(token, secretKey);

    // Attach user info to request
    request.user = decodedToken;

    next();
  } catch (error) {
    if (
      request.headers.accept &&
      request.headers.accept.includes("application/json")
    ) {
      return response.status(403).json({ error: "Invalid or expired token" });
    }
    return response.redirect("/login"); // Redirect for browser requests
  }
}

module.exports = { authenticateUser };
