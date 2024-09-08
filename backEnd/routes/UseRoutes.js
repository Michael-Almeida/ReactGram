const express = require("express");
const router = express.Router();
// Controller
const { register, login } = require("../controllers/UserController");

// Middleware
const validate = require("../middleware/HandleValidation");
const {
  useCreateValidation,
  loginValidation,
} = require("../middleware/userValidation");

// Routes
router.post("/register", useCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);

module.exports = router;
