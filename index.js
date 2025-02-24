// Importing required modules
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectMongoDB } = require("./connection");

const urlRoute = require("./routes/urlRoute");
const homeRoute = require("./routes/homeRoute");
const userRoute = require("./routes/userRoute");

const app = express();
const PORT = 3000;

// MongoDB Connection
connectMongoDB("mongodb://127.0.0.1:27017/REST-API")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.log("MongoDB Error: ", error));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middlewares to parse URL-encoded data and JSON data from request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes - prefix "/url" for all routes defined in urlRoute
app.use("/url", urlRoute);

// Routes - prefix "/" for all routes defined in homeRoute
app.use("/", homeRoute);

// Serve static files from the "public" directory
app.use(express.static("public"));

// Routes - prefix "/user" for all routes defined in userRoute
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${3000}`);
});
