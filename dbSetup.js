const mongoose = require("mongoose");
module.exports = () => {
  //Import the mongoose module
  //Set up default mongoose connection
  const mongoDB = process.env.MONGODB_CONNECTION_STRING;
  mongoose.connect(mongoDB);
  // Get Mongoose to use the global promise library
  mongoose.Promise = global.Promise;
  //Get the default connection
  const db = mongoose.connection;

  //Bind connection to error event (to get notification of connection errors)
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
};
