const express = require('express');

const router = express.Router({ mergeParams: true });

const controller = require('../controllers/votesController');

router.get('/', controller.getAll);
router.post('/', controller.createVote);
router.get('/:id', controller.getOne);

module.exports = router;
