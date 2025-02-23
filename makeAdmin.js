require("dotenv").config();

const mongoose = require("mongoose");
const UserData = require("./models/userModel");

mongoose.connect("mongodb://localhost:27017/REST-API");

async function makeAdmin() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) {
      throw new Error("Admin email not found in .env file");
    }

    // Find user by email
    const user = await UserData.findOne({ email: adminEmail });

    if (!user) {
      console.log("User not found.");
      return;
    }

    // Update role to 'admin' if not already
    if (user.role !== "admin") {
      user.role = "admin";
      await user.save();
      console.log(`User ${user.email} is now an admin.`);
    } else {
      console.log(`User ${user.email} is already an admin.`);
    }
  } catch (error) {
    console.error("Error making admin:", error.message);
  } finally {
    mongoose.connection.close();
  }
}

makeAdmin();
