require("dotenv").config();
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;

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
