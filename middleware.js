const jwt = require("jsonwebtoken");




 async function checkAuth(req, res, next) {
    try {
      
  // add more verification 
      if (!req.headers.cookie) {
        return res
          .status(401)
          .json({ message: "Unauthorized access detected" });
      }
      const token = req.headers.cookie.split("=")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      console.log(token,"token")
      console.log(decoded,"decoded")
      if (decoded && decoded.exp < Date.now()) {
        res.clearCookie("Authorization");
        return res
          .status(400)
          .json({
            isAuth: false,
            message: "Session expired, please log in again",
          });
      }
      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }



  module.exports = {
    checkAuth
  }