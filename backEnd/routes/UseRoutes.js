const express = require("express");
const router = express.Router();
// Controller
const {
  register,
  login,
  getCurrentUser,
} = require("../controllers/UserController");

// Middleware
const validate = require("../middleware/HandleValidation");
const {
  useCreateValidation,
  loginValidation,
} = require("../middleware/userValidation");
const authGuard = require("../middleware/AuthGuard");

// Routes
router.post("/register", useCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);

module.exports = router;
