const express = require("express");
const router = express.Router();

// Controller
const {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
} = require("../controllers/PhotoController");
// Middlewares
const { photoInsertValidation } = require("../middleware/PhotoValidation");
const authGuard = require("../middleware/AuthGuard");
const validate = require("../middleware/HandleValidation");
const { imageUpload } = require("../middleware/ImageUpload");
// Routes
router.post(
  "/",
  authGuard,
  imageUpload.single("image"),
  photoInsertValidation(),
  validate,
  insertPhoto
);
router.get("/", authGuard, getAllPhotos);
router.delete("/:id", authGuard, deletePhoto);

module.exports = router;
