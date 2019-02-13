const mongoose = require("mongoose");

function setMongoUrl({ user, password, host, port, database }) {
  let userData = "";

  if (user && password) {
    userData = user + ":" + password + "@";
  }

  let mongoUrl = "mongodb://" + userData + host + ":" + port + "/" + database;

  return mongoUrl;
}

async function connect({ user, password, host, port, database }) {
  let mongoUrl = setMongoUrl({ user, password, host, port, database });

  await mongoose.connect(mongoUrl, { useNewUrlParser: true });
}

module.exports = connect;