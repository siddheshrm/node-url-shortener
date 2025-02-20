const express = require("express");
const {
  createAccount,
  loginToAccount,
} = require("../controllers/userController");

const router = express.Router();

router.post("/", createAccount);
router.post("/login", loginToAccount);

module.exports = router;
