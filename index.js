// Importing required modules
const express = require("express");
const { connectMongoDB } = require("./connection");
const urlRoute = require("./routes/urlRoute");

const app = express();
const PORT = 3000;

// MongoDB Connection
connectMongoDB("mongodb://127.0.0.1:27017/REST-API")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.log("MongoDB Error: ", error));

// Middlewares to parse URL-encoded data and JSON data from request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes - prefix "/url" for all routes defined in urlRoute
app.use("/url", urlRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${3000}`);
});
