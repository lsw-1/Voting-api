// Get arguments passed on command line
const userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
  console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
}

const async = require('async');
const User = require('./api/models/User');
const Speaker = require('./api/models/Speaker');
const Vote = require('./api/models/Vote');

const mongoose = require('mongoose');

const mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const removeNumVotes = async () => {
  await Speaker.where('numVotes')
    .exists()
    .remove();
};

const removeVotesWithoutSpeaker = async () => {
  const speakers = await Speaker.find();
  const nors = speakers.map(s => ({ speaker: s._id }));
  await Vote.remove({ $nor: nors });
};

async.series(
  [removeNumVotes, removeVotesWithoutSpeaker],
  // Optional callback
  (err, results) => {
    if (err) {
      console.log(`FINAL ERR: ${err}`);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  },
);
