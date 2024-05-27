const mongoose = require("mongoose");

const db = mongoose
  .connect(process.env.MONGO,{  serverSelectionTimeoutMS: 30000})
  .then((res) => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = db;
