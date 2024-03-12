const express = require("express");
const app = express();
const cookie= require('cookie-parser')



const dotenv = require("dotenv")
dotenv.config()





const cors = require("cors");
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// setting up the express to send and recive json data
app.use(express.json());
app.use(cookie())



const router = require("./routes/auth.route");

app.use(router);

// /api route

// runing
app.listen(3000, () => {
  console.log("server listening on port 3000");
});
