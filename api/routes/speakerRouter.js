const express = require('express');

const router = express.Router();
const controller = require('../controllers/speakerController');

router.get('/', controller.getAll);
router.get('/count_votes', controller.countTotalVotes);
router.get('/:id', controller.getOne);

module.exports = router;
