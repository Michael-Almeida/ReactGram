const express = require("express");
const router = express.Router();
// Controller
const { register } = require("../controllers/UserController");

// Middleware
const validate = require("../middleware/HandleValidation");
const { useCreateValidation } = require("../middleware/userValidation");

// Routes
router.post("/register", useCreateValidation(), validate, register);

module.exports = router;