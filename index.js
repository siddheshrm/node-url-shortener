// Importing required modules
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectMongoDB } = require("./connection");

// Importing route handlers
const urlRoute = require("./routes/urlRoute");
const homeRoute = require("./routes/homeRoute");
const userRoute = require("./routes/userRoute");

const app = express();
const PORT = 3000;

// Establish MongoDB Connection
connectMongoDB(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.log("MongoDB Error: ", error));

// Setting up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware to parse URL-encoded data (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON data from request body
app.use(express.json());

// Middleware for handling cookies
app.use(cookieParser());

// Routes
app.use("/url", urlRoute); // Handles URL shortening-related routes
app.use("/", homeRoute); // Handles home/dashboard routes
app.use("/user", userRoute); // Handles user authentication-related routes

// Serve static files (CSS) from the "public" directory
app.use(express.static("public"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
