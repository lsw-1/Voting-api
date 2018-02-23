const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");

router.get("/login", controller.signup);

module.exports = router;
