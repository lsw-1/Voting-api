const express = require("express");
const router = express.Router();
const speakerRoutes = require("./speakerRouter");
const voteRoutes = require("./voteRouter");
const userRoutes = require("./userRouter");
/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});
router.use("/auth", userRoutes);
router.use("/speakers", speakerRoutes);
router.use("/speakers/:speakerId/votes", voteRoutes);

module.exports = router;
