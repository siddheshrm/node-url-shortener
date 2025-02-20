const express = require("express");
const {
  createAccount,
  loginToAccount,
  handleLogout,
} = require("../controllers/userController");

const router = express.Router();

router.post("/", createAccount);
router.post("/login", loginToAccount);
router.post("/logout", handleLogout);

module.exports = router;
