const mongoose = require("mongoose");

const schema = new mongoose.Schema({ name: String, size: String });
const Demo = mongoose.model("Demo", schema);


module.exports = Demo
