const jwt = require("jsonwebtoken");

// Replace this with your own secret key before deploying
const secretKey = "your-secret-key-here";

function authenticateUser(request, response, next) {
  // Get token from cookies
  const token = request.cookies.authToken;

  if (!token) {
    return response.redirect("/login");
  }

  try {
    // Verify token
    const decodedToken = jwt.verify(token, secretKey);

    // Attach user info to request
    request.user = decodedToken;

    next();
  } catch (error) {
    return response.redirect("/login");
  }
}

module.exports = { authenticateUser };
