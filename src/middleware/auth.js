const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {

    let token = req.cookies.token; 

    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1]; 
      }
    }

    if (!token) {
      return res.status(401).json({
        message: "Authorization token missing"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (error) {
    res.status(401).json({
      message: "Invalid token"
    });
  }
};

module.exports = auth;