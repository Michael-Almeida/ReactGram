const express = require("express");
const router = express.Router();

// Controller
const {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  gettUserPhotos,
  getPhotoById,
  updatePhoto,
} = require("../controllers/PhotoController");
// Middlewares
const {
  photoInsertValidation,
  photoUpdateValidation,
} = require("../middleware/PhotoValidation");
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
router.delete("/:id", authGuard, deletePhoto);
router.get("/", authGuard, getAllPhotos);
router.get("/user/:id", authGuard, gettUserPhotos);
router.get("/:id", authGuard, getPhotoById);
router.put("/:id", authGuard, photoUpdateValidation(), validate, updatePhoto);

module.exports = router;
