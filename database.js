const mongoose = require("mongoose");

const db = mongoose
  .connect("mongodb+srv://mouhammedalifaidi:3259@cluster0.9tj6t4o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then((res) => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = db;
