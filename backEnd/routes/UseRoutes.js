const express = require("express");
const router = express.Router();
// Controller
const {
  register,
  login,
  getCurrentUser,
  getUserById,
  update,
} = require("../controllers/UserController");

// Middleware
const validate = require("../middleware/HandleValidation");
const {
  useCreateValidation,
  loginValidation,
  userUpdateValidation,
} = require("../middleware/userValidation");
const authGuard = require("../middleware/AuthGuard");
const { imageUpload } = require("../middleware/ImageUpload");

// Routes
router.post("/register", useCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);
router.put(
  "/",
  authGuard,
  userUpdateValidation(),
  validate,
  imageUpload.single("profileImage"),
  update
);
router.get("/:id", getUserById);

module.exports = router;
