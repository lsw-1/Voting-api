const express = require('express');

const router = express.Router();
const controller = require('../controllers/userController');

router.post('/login', controller.login);
router.post('/register', controller.register);
// router.get("/logout", controller.register);

module.exports = router;
