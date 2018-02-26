const express = require('express');

const router = express.Router();
const controller = require('../controllers/speakerController');

router.get('/', controller.getAll);

router.post('/', controller.createSpeaker);
router.get('/votes', controller.countTotalVotes);

router.get('/:id', controller.getOne);

module.exports = router;
