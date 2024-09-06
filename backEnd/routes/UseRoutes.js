const express = require("express");
const router = express.Router();

const { register } = require("../controllers/UserController");

const validate = require("../middleware/HandleValidation");

router.post("/register", validate, register);

module.exports = router;
