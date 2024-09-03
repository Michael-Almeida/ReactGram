const express = require("express");
const router = express();

router.get("/", (req, res) => {
  res.send("Api working!");
});
module.exports = router;
