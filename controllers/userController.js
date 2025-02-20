const UsersData = require("../models/userModel");

async function createAccount(request, response) {
  const { name, email, password } = request.body;

  // Check if the email already exists
  const existingUser = await UsersData.findOne({ email });
  if (existingUser) {
    return response.render("userView", { error: "Email already registered" });
  }

  // Create new user
  const newUser = await UsersData.create({ name, email, password });

  // If creation fails, stay on the signup page
  if (!newUser) {
    return response.render("userView", { error: "Signup failed. Try again." });
  }

  return response.redirect("/");
}

async function loginToAccount(request, response) {
  const { email, password } = request.body;
  const existingUser = await UsersData.findOne({ email, password });

  // Check if the email exists
  if (!existingUser) {
    return response.render("loginView", {
      error: "Invalid username or password",
    });
  }
  return response.redirect("/");
}

module.exports = { createAccount, loginToAccount };
