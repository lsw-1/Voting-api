const express = require('express');
const jwt = require('express-jwt');

const router = express.Router();
const speakerRoutes = require('./speakerRouter');
const voteRoutes = require('./voteRouter');
const userRoutes = require('./userRouter');
const adminRoutes = require('./adminRouter');
/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Voting api' });
});
router.use('/auth', userRoutes);
router.use('/speakers', speakerRoutes);
router.use('/speakers/:speakerId/votes', voteRoutes);
router.use('/admin', jwt({ secret: process.env.JWT_SECRET }), adminRoutes);

module.exports = router;
