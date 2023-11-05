const express = require("express");
const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../controller/authController.js");
const { authenticateJWT } = require("../middleware/middleware.js");

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/user-info", authenticateJWT, getUserInfo);

module.exports = router;
