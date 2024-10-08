const express = require("express");
const router = express();

router.use("/api/users", require("./UseRoutes"));
router.use("/api/photos", require("./PhotoRoutes"));

router.get("/", (req, res) => {
  res.send("Api working!");
});
module.exports = router;
