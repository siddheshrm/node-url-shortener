const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UsersData = require("../models/userModel");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

async function createAccount(request, response) {
  const { name, email, password } = request.body;

  // Check if the email already exists
  const existingUser = await UsersData.findOne({ email });
  if (existingUser) {
    return response.render("userView", { error: "Email already registered" });
  }

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10); // 10 rounds of salting

  // Create new user
  const newUser = await UsersData.create({
    name,
    email,
    password: hashedPassword,
  });

  // If creation fails, stay on the signup page
  if (!newUser) {
    return response.render("userView", { error: "Signup failed. Try again." });
  }

  return response.redirect("/");
}

async function loginToAccount(request, response) {
  const { email, password } = request.body;
  const existingUser = await UsersData.findOne({ email });

  // Check if the email exists
  if (!existingUser) {
    return response.render("loginView", {
      error: "Email not found.",
    });
  }

  // Compare input password with hashed password in the database
  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) {
    return response.render("loginView", {
      error: "Invalid username or password",
    });
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      userId: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
    },
    secretKey,
    { expiresIn: "1h" }
  );

  // Send response differently for browser and API
  if (
    request.headers.accept &&
    request.headers.accept.includes("application/json")
  ) {
    return response.json({ token }); // API response for testing APIs
  }

  // Store token in a cookie (for client-side use)
  response.cookie("authToken", token, {
    httpOnly: true,
    sameSite: "Strict",
  });

  return response.redirect("/");
}

async function handleLogout(request, response) {
  response.clearCookie("authToken");
  response.redirect("/login");
}

module.exports = { createAccount, loginToAccount, handleLogout };
