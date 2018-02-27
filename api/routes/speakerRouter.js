const express = require('express');

const router = express.Router();
const controller = require('../controllers/speakerController');

router.get('/', controller.getAll);

router.post('/', controller.createSpeaker);
router.get('/count_votes', controller.countTotalVotes);

router.get('/:id', controller.getOne);

module.exports = router;
